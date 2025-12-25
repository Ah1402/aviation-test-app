# Read file
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Apply the manual fixes
content = content.replace('"Charles""', '"Charles"')
content = content.replace('"Performance Class "A""', '"Performance Class \\"A\\""')
content = content.replace('"Performance Class "B""', '"Performance Class \\"B\\""')
content = content.replace('"Performance Class "C""', '"Performance Class \\"C\\""')
content = content.replace('"Performance Class "D""', '"Performance Class \\"D\\""')
content = content.replace('"above 5000" and underneath', '"above 5000\' and underneath')
content = content.replace('"010°40"W"', '"010°40\'W"')
content = content.replace('"000°15"E"', '"000°15\'E"')
content = content.replace('"000°40"E"', '"000°40\'E"')
content = content.replace('"002°10"W"', '"002°10\'W"')
content = content.replace('"00°00"N/S 170°00"W"', '"00°00\'N/S 170°00\'W"')
content = content.replace('"04°00"N 170°35.9"W"', '"04°00\'N 170°35.9\'W"')
content = content.replace('"04°00"N 169°01.8"W"', '"04°00\'N 169°01.8\'W"')
content = content.replace('"58°33"N 174°11.5"W"', '"58°33\'N 174°11.5\'W"')
content = content.replace('"58°33"N 173°48.5"W"', '"58°33\'N 173°48.5\'W"')
content = content.replace('"Either "offset" or "parallel""', '"Either \\"offset\\" or \\"parallel\\""')

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Applied manual fixes')