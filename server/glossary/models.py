from django.db import models


class Glossary(models.Model):
    '''
    Glossary Model
    Stores translation pairs that will be used as domain specific glossary
    '''
    LANG_CHOICES = [
        ("eng", "English"),
        ("ass", "Assamese"),
        ("ben", "Bengali"),
        ("bod", "Bodo"),
        ("dog", "Dogri"),
        ("guj", "Gujarati"),
        ("hin", "Hindi"),
        ("kan", "Kannada"),
        ("kas", "Kashmiri"),
        ("kon", "Konkani"),
        ("mai", "Maithili"),
        ("mal", "Malayalam"),
        ("man", "Manipuri"),
        ("mar", "Marathi"),
        ("nep", "Nepali"),
        ("odi", "Odia"),
        ("pun", "Punjabi"),
        ("san", "Sanskrit"),
        ("sat", "Santali"),
        ("sin", "Sindhi"),
        ("sih", "Sinhala"),
        ("tam", "Tamil"),
        ("tel", "Telugu"),
        ("urd", "Urdu"),
    ]

    DOMAIN_CHOICES = [
        ('gen', 'General'),
        ('leg', 'Legal'),
        ('edu', 'Education'),
    ]

    LEVEL_CHOICES = [
        ("w", "Word Level"),
        ("p", "Phrase Level"),
        ("s", "Sentence Level"),
    ]
    source = models.CharField(max_length=150, db_index=True, verbose_name="Source Text")
    target = models.CharField(max_length=150, verbose_name="Target Text")
    source_lang = models.CharField(max_length=3, choices=LANG_CHOICES, verbose_name="Source Language")
    target_lang = models.CharField(max_length=3, choices=LANG_CHOICES, verbose_name="Target Language")
    domain = models.CharField(max_length=3, choices=DOMAIN_CHOICES, default="gen", verbose_name="Text Domain")
    # TODO: Check if Collection source can be empty, then set null=True, blank=True
    collection_src = models.CharField(max_length=100, verbose_name="Collection Source")
    level = models.CharField(max_length=1, choices=LEVEL_CHOICES, verbose_name="Level")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.source} - {self.target}"
