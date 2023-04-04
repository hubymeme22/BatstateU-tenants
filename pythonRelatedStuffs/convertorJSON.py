
import pandas as pd

# Read the Excel file into a pandas DataFrame
df = pd.read_excel('Dorm-Occupants.xlsx')

# Convert the DataFrame to JSON format
json_data = df.to_json(orient='records')

# Write the JSON data to a file
with open('Dorm-Occupants.json', 'w') as f:
    f.write(json_data)

