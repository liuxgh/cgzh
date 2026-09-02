import os
import glob

components = glob.glob('src/components/*.tsx')

for file in components:
    if file == 'src/components/CopyableText.tsx':
        continue
        
    with open(file, 'r') as f:
        content = f.read()
        
    needs_import = False
    
    # Define replacements: (pattern, wrapped_pattern, variable)
    # We want to replace {ent.name}, {ent.creditCode}, {ent.legalRep}, etc.
    replacements = [
        ('{ent.name}', '<CopyableText text={ent.name}>{ent.name}</CopyableText>'),
        ('{ent.creditCode}', '<CopyableText text={ent.creditCode}>{ent.creditCode}</CopyableText>'),
        ('{ent.legalRep}', '<CopyableText text={ent.legalRep}>{ent.legalRep}</CopyableText>'),
        ('{ent.registeredCapital}', '<CopyableText text={ent.registeredCapital}>{ent.registeredCapital}</CopyableText>'),
        ('{ent.establishedDate}', '<CopyableText text={ent.establishedDate}>{ent.establishedDate}</CopyableText>'),
        ('{ent.phone}', '<CopyableText text={ent.phone}>{ent.phone}</CopyableText>'),
        ('{ent.email}', '<CopyableText text={ent.email}>{ent.email}</CopyableText>'),
        ('{ent.address}', '<CopyableText text={ent.address}>{ent.address}</CopyableText>'),
        ('{ent.shortName}', '<CopyableText text={ent.shortName}>{ent.shortName}</CopyableText>'),
        ('{ent.status}', '<CopyableText text={ent.status}>{ent.status}</CopyableText>'),
        ('{ent.contact.contactPerson}', '<CopyableText text={ent.contact.contactPerson}>{ent.contact.contactPerson}</CopyableText>'),
        ('{ent.contact.phone}', '<CopyableText text={ent.contact.phone}>{ent.contact.phone}</CopyableText>'),
        ('{ent.contact.email}', '<CopyableText text={ent.contact.email}>{ent.contact.email}</CopyableText>'),
        ('{enterprise.name}', '<CopyableText text={enterprise.name}>{enterprise.name}</CopyableText>'),
        ('{enterprise.creditCode}', '<CopyableText text={enterprise.creditCode}>{enterprise.creditCode}</CopyableText>'),
        ('{enterprise.legalRep}', '<CopyableText text={enterprise.legalRep}>{enterprise.legalRep}</CopyableText>'),
        ('{enterprise.registeredCapital}', '<CopyableText text={enterprise.registeredCapital}>{enterprise.registeredCapital}</CopyableText>'),
        ('{enterprise.establishedDate}', '<CopyableText text={enterprise.establishedDate}>{enterprise.establishedDate}</CopyableText>'),
        ('{enterprise.phone}', '<CopyableText text={enterprise.phone}>{enterprise.phone}</CopyableText>'),
        ('{enterprise.email}', '<CopyableText text={enterprise.email}>{enterprise.email}</CopyableText>'),
        ('{enterprise.address}', '<CopyableText text={enterprise.address}>{enterprise.address}</CopyableText>'),
        ('{enterprise.shortName}', '<CopyableText text={enterprise.shortName}>{enterprise.shortName}</CopyableText>'),
        ('{enterprise.status}', '<CopyableText text={enterprise.status}>{enterprise.status}</CopyableText>'),
    ]
    
    modified = False
    # Avoid duplicate wrapping
    for old, new in replacements:
        if old in content and new not in content:
            # But wait, what if {ent.name} is used inside a string template or prop? 
            # We should only replace if it's rendered in JSX as >{ent.name}< or similar.
            # To be safer, we can regex: >{ent.name}< -> ><CopyableText text={ent.name}>{ent.name}</CopyableText><
            pass

with open('src/components/CopyableText.tsx', 'r') as f:
    pass
