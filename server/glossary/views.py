from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Glossary
from .serializers import GlossarySerializer

@api_view(['POST'])
def index(request):
    '''
    View to fetch glossaries for a given sentence
    Accepted Methods: POST
    Request Body: {
        "input": [
            {
                "source": "sentence 1"
            },
            {
                "source": "sentence 2"
            }
        ],
        "config": {
            "language": {
                "sourceLanguage": "en",
                "targetLanguage": "hi"
            },
            "domain": "domain",
            "limit": 5
        }
    }
    '''
    # Parse the request body
    body = request.data

    # Get the search terms from the request body
    search_input = [text['source'] for text in body['input']]

    # Get remaining config from the request body
    source_lang = body['config']['language']['sourceLanguage']
    target_lang = body['config']['language']['targetLanguage']
    domain = body['config']['domain']
    limit = body['config']['limit']

    # Define an empty list to store the glossaries
    output = []

    # Loop through the search terms (this is pretty inefficient and could be improved with something like Elasticsearch)
    for term in search_input:
        # Add all the words to the queryset
        queryset = Q()
        for word in term.split():
            # NOTE: Could change this to iexact if we only want the exact matches
            queryset |= Q(source__icontains=word)

        # Filter the glossary based on the search terms
        glossaries = Glossary.objects.filter(queryset).filter(
            source_lang=source_lang,
            target_lang=target_lang,
            domain=domain
        ).order_by('-created_at')[:limit]

        # Serialize the glossaries
        serializer = GlossarySerializer(glossaries, many=True)
        output.append(serializer.data)

    return Response({
        "output": output
    })
