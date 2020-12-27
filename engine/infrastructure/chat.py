import json
import random
import torch
from application.neural_network import NeuralNet

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
with open('data/intents.json', 'r') as json_data:
    intents = json.load(json_data)

FILE = "data/data.pth"
data = torch.load(FILE)

model = NeuralNet(data, device)
model.load_state_dict(data['model_state'])
model.eval()


def response_sentence(sentence_input):
    tags = data['tags']
    probs, predicted = model.find_probability(sentence_input)
    tag = tags[predicted.item()]

    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent['tag']:
                return f"{random.choice(intent['responses'])}"
    else:
        return f"I do not understand..."
