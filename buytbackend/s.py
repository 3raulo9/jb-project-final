import spacy

def remove_grammar_suffixes_russian(sentence):
    nlp = spacy.load("ru_core_news_sm")
    doc = nlp(sentence)
    
    root_words = []
    for token in doc:
        root_word = token.text
        if token.lemma_ != '-PRON-':  # Exclude pronouns
            suffix_start = token.text.find(token.lemma_) + len(token.lemma_)
            root_word = token.text[:suffix_start]
        root_words.append(root_word)
    
    return ' '.join(root_words)

# Example usage
user_input = input("Enter a Russian sentence: ")
cleaned_sentence = remove_grammar_suffixes_russian(user_input)
print("Cleaned sentence:", cleaned_sentence)
