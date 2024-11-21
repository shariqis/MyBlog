from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from Home.models import User,Post,Comment
from Home.serializers import RegSerializer,UserDataSerializer,PostSerializer,CommentSerializer
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth.models import User
from django.http import Http404

# Create your views here.



class Register(APIView):
    def post(self,request,format=None):
        serializer=RegSerializer(data=request.data)
        data={}
        if serializer.is_valid():
            account=serializer.save()
            data['response']='registered'
            data['username']=account.username
            data['email']=account.email
            token,create=Token.objects.get_or_create(user=account)
            data['token']=token.key
        else:
            data =serializer.errors
            
        return Response(data)   
    
    
class LoginView(APIView):
    def post(self, request):
     
        user = authenticate(username=request.data.get('username'), password=request.data.get('password'))

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token':token.key, 'user_id': user.id }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
    
    
class Welcome(APIView):
    permission_classes=(IsAuthenticated,)
    print('...........------...........')
    def get(self,request):
        print(">>>>>>>>>>>>>>>>>")
        content={'user':str(request.user),'userid':str(request.user.id)}
        return Response(content)   
    
    
class UserDetails(APIView):
    def get_object(self,pk):
        try:
            return User.objects.get(pk=pk)
        except:
            # return Response({'message':"no user"})
            raise Http404
            
            
    def get(self,requset,pk,format=None):
        userData=self.get_object(pk)
        serializer=UserDataSerializer(userData)
        return Response(serializer.data)
 

#######################################################



@api_view(['GET'])
def login_details(request):
    print('-------------',request.query_params)
    if request.query_params:
        user=User.objects.filter(username=request.query_params['username'])
    else:
        user=User.objects.all()
        
    print('.....MMMMMMMMMMMMMMMMMMMM...........',user)
        
        
    if user:
        serializer=UserDataSerializer(user,many=True)    
        return Response({"data":serializer.data})
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)  

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    user = request.user  # Retrieves the user based on the auth token
    user_data = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'username': user.username,
        'email': user.email,
    }
    return Response(user_data)



# @api_view(['GET', 'POST'])
# def post_list_create(request):
#     if request.method == 'GET':
#         posts = Post.objects.all()
#         serializer = PostSerializer(posts, many=True)
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         username = request.data.get("username")
#         if not username:
#             return Response({"error": "Username is required."}, status=status.HTTP_400_BAD_REQUEST)
        
#         try:
#             author = User.objects.get(username=username)
#         except User.DoesNotExist:
#             return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

#         serializer = PostSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(author=author)  # Save the post with the logged-in user as author
#             return Response({"data":serializer.data,"status":1}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
class PostListCreateView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        post = serializer.save(created_by=self.request.user)
        
        # user_profile = User.objects.get(user=self.request.user)
        
        # user_profile.your_recipes.add(recipe)
        # user_profile.save()
        return Response({"data":serializer.data,"status":1}, status=status.HTTP_201_CREATED)



@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def post_detail(request,  pk=None):
    
    try:
        if request.method == 'GET' and pk is None:
            user_posts = Post.objects.filter(created_by=request.user)
            serializer = PostSerializer(user_posts, many=True)
            return Response(serializer.data)
        
        # Otherwise, handle individual post by pk
        post = Post.objects.get(pk=pk, created_by=request.user)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    #     post = Post.objects.get(pk=pk)
    # except Post.DoesNotExist:
    #     return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = PostSerializer(post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)      
    
    
    


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def other_post_detail(request, pk=None):
    try:
        # Check if the request method is to get all posts by the user
        if request.method == 'GET' and pk is None:
            user_posts = Post.objects.exclude(created_by=request.user)
            serializer = PostSerializer(user_posts, many=True)
            return Response(serializer.data)
        
        # Otherwise, handle individual post by pk
        post = Post.objects.exclude(pk=pk, created_by=request.user)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)    
    
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def comment_list_create(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        comments = Comment.objects.filter(post=post)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(commenter=request.user, post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 



def chk(request):
    return HttpResponse('MY APGE TO TEST')

