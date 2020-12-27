import torch
from infrastructure.words import bag_of_words, tokenize


class NeuralNet(torch.nn.Module):

    def __init__(self, data, device):
        super(NeuralNet, self).__init__()
        self.data = data
        self.l1 = torch.nn.Linear(data['input_size'], data['hidden_size'])
        self.l2 = torch.nn.Linear(data['hidden_size'], data['hidden_size'])
        self.l3 = torch.nn.Linear(data['hidden_size'], data['output_size'])
        self.relu = torch.nn.ReLU()
        self.device = device
        self.to(device)

    def forward(self, x):
        out = self.l1(x)
        out = self.relu(out)
        out = self.l2(out)
        out = self.relu(out)
        out = self.l3(out)
        return out

    def find_probability(self, query_question):
        sentence_ = tokenize(query_question)
        X = bag_of_words(sentence_, self.data['all_words'])
        X = X.reshape(1, X.shape[0])
        X = torch.from_numpy(X).to(self.device)

        output = self(X)
        _, predicted = torch.max(output, dim=1)

        probabilities = torch.softmax(output, dim=1)
        return probabilities, predicted

