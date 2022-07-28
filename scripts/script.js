class CardGame {
    constructor() {
        this.kingImage = document.getElementById('kingImage');
        this.queenContainer = document.getElementById('queenContainer');
        this.resultContainer = document.getElementById('resultContainer');

        this.cardsCount = 4;
        this.isQueenOpened = false;

        this.spans = new Array(this.cardsCount);
        this.backImages = new Array(this.cardsCount);

        this.king = 0;
        this.resultMessage = null;

        this.queenImages = new Array(this.cardsCount);
        this.queens = Array.apply(0, new Array(this.cardsCount)).map((_, i) => i);
    }

    initializeComponent() {              
        for (let i = 0; i < this.cardsCount; ++i) {
            this.spans[i] = document.createElement('span');
            this.spans[i].classList.add('card');

            this.spans[i].addEventListener('click', () => {
                this.onCardClicked(i);
            });

            this.queenImages[i] = document.createElement('img');

            this.backImages[i] = document.createElement('img');
            this.backImages[i].src = './images/back.png';

            this.spans[i].appendChild(this.backImages[i]);
            this.queenContainer.appendChild(this.spans[i]);
        }

        this.changeKing();
        this.shuffleQueens();
    }

    changeKing() {
        this.king = Math.floor(Math.random() * this.cardsCount);
        this.kingImage.src = `./images/king_${this.king}.jpg`;
    }

    shuffleQueens() {
        this.queens.sort(() => Math.random() - 0.5);

        for (let i = 0; i < this.queenImages.length; ++i) {
            this.queenImages[i].src = `./images/queen_${this.queens[i]}.jpg`;
        }
    }

    onCardClicked(index) {
        if (this.isQueenOpened) {
            return;
        }
        
        this.isQueenOpened = true;

        this.spans[index].removeChild(this.backImages[index]);
        this.spans[index].appendChild(this.queenImages[index]);

        this.resultMessage = document.createElement('h3');
        this.resultMessage.classList.add('centerred');

        let resultMessageText;

        if (resultMessageText = this.king === this.queens[index]) {
            resultMessageText = document.createTextNode('The king has found his queen. You have won!');
            this.resultMessage.classList.add('greenMessage');
        }
        else {
            resultMessageText = document.createTextNode('This queen is not suitable for a king. You have lost!');
            this.resultMessage.classList.add('redMessage');
        }

        this.resultMessage.appendChild(resultMessageText);
        this.resultContainer.appendChild(this.resultMessage);

        setTimeout(() => {
            this.resultContainer.removeChild(this.resultMessage);

            this.spans[index].removeChild(this.queenImages[index]);
            this.spans[index].appendChild(this.backImages[index]);

            this.changeKing();
            this.shuffleQueens();

            this.isQueenOpened = false;
        }, 2500);
    }
}

const cardGame = new CardGame();
cardGame.initializeComponent();
