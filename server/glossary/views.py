from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Glossary
from .serializers import GlossarySerializer

@api_view(['POST'])
def index(request):
    # Parse the request body
    body = request.data

    # Get the search terms from the request body
    search_input = [text['source'] for text in body['input']]

    # Get remaining config from the request body
    source_lang = body['config']['language']['sourceLanguage']
    target_lang = body['config']['language']['targetLanguage']
    domain = body['config']['domain']
    limit = body['config']['limit']

    # Filter the glossary based on the search terms
    glossaries = Glossary.objects.filter(
        source__in=search_input,
        source_lang=source_lang,
        target_lang=target_lang,
        domain=domain
    ).order_by('-created_at')[:limit]

    # Serialize and return the glossaries
    serializer = GlossarySerializer(glossaries, many=True)
    return Response(serializer.data)
