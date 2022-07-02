module.exports = function toReadable (number) {
    stringArrayFormatter.number = number;
    
    let stringArray = stringArrayFormatter
        .convertToString()
        .trimLeftNulls()
        .reverseString()
        .splitByThreeCharacter()
        .number;

    stringArray.reverse();

    let result = [];

    for (let itemIndex = 0; itemIndex < stringArray.length; itemIndex++) {
        stringArrayItemFormatter.item = stringArray[itemIndex];

        stringArray[itemIndex] = stringArrayItemFormatter
            .reverseString()
            .trimLeftNulls()
            .item;
    
        switch (stringArray[itemIndex].length) {
            case 3: {
                result.push(stringArrayItemFormatter.pushHundredsValue(), separatorWordDictionary[0]);
            }
            case 2: {
                let decimalTextValue = stringArrayItemFormatter.pushDecimalValue() || '';

                if (decimalTextValue !== '') {
                    result.push(decimalTextValue);
                }
            }
            case 1: {
                let numberTextValue = stringArrayItemFormatter.pushNumberValue() || '';

                if (numberTextValue !== '') {
                    result.push(numberTextValue);
                }
            }
            default: {
                break;
            }
        }

        if (itemIndex !== stringArray.length - 1) {
            result.push(separatorWordDictionary[stringArray.length - (itemIndex + 1)]);
        }
    }

    return result.join(' ').toLowerCase();
}

const numberWordDictionary = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const secondTenNumberWordDictionary = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const decimalWordDictionary = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const separatorWordDictionary = ['Hundred', 'Thousant', 'Million', 'Billion', 'Trillion'];

const stringArrayFormatter = {
    number: '',
    convertToString() {
        this.number = String(this.number);
        return this;
    },
    trimLeftNulls() {
        this.number = this.number.replace(/^[0]+/, '');
        return this;
    },
    reverseString() {
        this.number = this.number.split('').reverse().join('');
        if(this.number === '') {
            this.number = '0';
        }
        return this;
    },
    splitByThreeCharacter() {
        this.number = this.number.match(/.{1,3}/g);
        return this;
    }
};

const stringArrayItemFormatter = {
    item: '',
    reverseString() {
        this.item = this.item.split('').reverse().join('');
        return this;
    },
    trimLeftNulls() {
        this.item = this.item.replace(/^[0]+/, '');
        if(this.item === '') {
            this.item = '0';
        }
        return this;
    },
    pushHundredsValue() {
        return numberWordDictionary[Number(this.item[0])];
    },
    pushDecimalValue() {
        if (Number(this.item[this.item.length - 2]) === 0) {
            return '';
        } else if (Number(this.item[this.item.length - 2]) === 1) {
            return secondTenNumberWordDictionary[Number(this.item[this.item.length - 1])]
        } else {
            return decimalWordDictionary[Number(this.item[this.item.length - 2])];
        }
    },
    pushNumberValue() {
        if ((Number(this.item[this.item.length - 1]) !== 0 && Number(this.item[this.item.length - 2]) !== 1)
            || this.item.length === 1) {
            return numberWordDictionary[Number(this.item[this.item.length - 1])];
        }
        return '';
    }
};
