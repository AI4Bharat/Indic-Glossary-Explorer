from django.contrib import admin
from .models import Glossary

class GlossaryAdmin(admin.ModelAdmin):
    list_display = ('source', 'target', 'domain', 'collection_src', 'level')
    list_filter = ('source_lang', 'target_lang', 'domain', 'collection_src', 'level')
    search_fields = ('source', 'target')
    ordering = ('-created_at',)

admin.site.register(Glossary, GlossaryAdmin)
