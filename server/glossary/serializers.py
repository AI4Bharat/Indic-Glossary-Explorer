from rest_framework.serializers import ModelSerializer

from .models import Glossary

class GlossarySerializer(ModelSerializer):
    class Meta:
        model = Glossary
        fields = '__all__'
