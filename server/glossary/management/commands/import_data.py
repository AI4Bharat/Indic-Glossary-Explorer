from csv import DictReader
from datetime import datetime

from django.core.management import BaseCommand

from glossary.models import Glossary

class Command(BaseCommand):
    '''
    Management command to import glossary data from a CSV file.
    '''
    help="Loads data from a CSV file into the glossary"

    def add_arguments(self, parser):
        # Add required argument file_path
        parser.add_argument('file_path', type=str, help="Path to the CSV file")

        # Add optional argument chunksize
        parser.add_argument('--chunksize', type=int, default=5000, help="Number of rows to process at a time")

    def handle(self, *args, **options):
        # Store start time
        start_time = datetime.now()

        # Get the command line arguments
        file_path = options['file_path']
        chunksize = options['chunksize']
        numRows = 0

        # Open the given CSV file
        with open(file_path, 'r') as csvfile:
            # Read the CSV file using DictReader
            reader = DictReader(csvfile)
            glossaries = []

            # Loop through each row in the CSV file
            for row in reader:
                # Create a Glossary object from the row
                glossary = Glossary(
                    source=row['Source'],
                    target=row['Target'],
                    source_lang=row['Src Language'],
                    target_lang=row['Tgt Language'],
                    domain=row['Domain'],
                    collection_src=row['Collection Source'],
                    level=row['Glossary Level'],
                )

                # Add the Glossary object to the list of glossaries
                glossaries.append(glossary)

                # If the list of glossaries exceeds the chunksize, save them to the database and clear the list
                if numRows > 0 and numRows % chunksize == 0:
                    Glossary.objects.bulk_create(glossaries)
                    glossaries = []

                numRows += 1

            # Save the remaining glossaries to the database
            if glossaries:
                Glossary.objects.bulk_create(glossaries)

        # Store end time
        end_time = datetime.now()

        # Print the total time taken to import the data
        self.stdout.write(
            self.style.SUCCESS(
                f"Loaded {numRows + 1} glossaries in {(end_time - start_time).total_seconds()} seconds!"
            )
        )
