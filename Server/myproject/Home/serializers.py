from rest_framework import serializers
from Home.models import User,Post,Comment


class RegSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
     
        fields="__all__"

    def save(self):
        reg=User(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            first_name=self.validated_data['first_name'],
            last_name=self.validated_data['last_name'],
            gender=self.validated_data['gender'],
            phone=self.validated_data['phone'],
            
        )    
        password=self.validated_data['password']
        
        
        
        
        
        reg.set_password(password)
        reg.save()
        return reg




class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','email','first_name','last_name']


# class ItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Items
#        # fields=('name','rate')
#         fields="__all__"        



class PostSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source='created_by.username')
    created_by_id = serializers.ReadOnlyField(source='created_by.id')
    created_at = serializers.DateTimeField("%Y-%m-%d %H:%M:%S", read_only=True)
    comment_count = serializers.SerializerMethodField()
    

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_by', 'created_at','created_by_id','comment_count']
        read_only_fields = ['id', 'created_at']
        
    def get_comment_count(self, obj):
        return obj.comments.count()    
        
        
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'commenter', 'text', 'created_at']
        read_only_fields = ['id', 'commenter', 'created_at']        