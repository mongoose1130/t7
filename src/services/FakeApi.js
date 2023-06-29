export async function getCustomers() {
    const customers = [
        {id: 1, name: "George Washington"},
        {id: 2, name: "Martha Washington"},
        {id: 3, name: "John Adams"},
        {id: 4, name: "Abigail Adams"},
        {id: 5, name: "Thomas Jefferson"},
        {id: 6, name: "Martha Jefferson"},
        {id: 7, name: "James Monroe"},
        {id: 8, name: "Elizabeth Monroe"},
        {id: 9, name: "James Madison"},
        {id: 10, name: "Dolley Madison"},
        {id: 11, name: "Andrew Jackson"},
        {id: 12, name: "Rachel Jackson"}
    ]

    const transactions = await getTransactions();
    transactions.sort((a, b) => a.cust_id - b.cust_id);

    let results = {};

    transactions.forEach((transaction) => {
        const { cust_id, date, amount, rewards } = transaction;

        if (!results[cust_id]) {
            results[cust_id] = { date, amount, rewards };
        } else {
            results[cust_id].amount += amount;
            results[cust_id].rewards += rewards;
        }
    });

    return customers.map((customer) => {
        const {id, name} = customer;
        const {date, amount, rewards} = results[id] || {date: 'n/a', amount: 0, rewards: 0};

        return {id, name, date, amount, rewards};
    })
}

export async function fetchDetail(customer) {
    const transactions = await getTransactions();
    const filtered = transactions.filter((transaction) => transaction.cust_id === customer.id);

    return filtered.map((transaction) => {
        const {id, date, amount, rewards} = transaction;
        return {id, date, amount, rewards};
    })
}

export async function getTransactions() {
    await fakeCall();
    return [
        {
            "id": 0,
            "cust_id": 6,
            "date": "2023-06-02",
            "amount": 99,
            "rewards": 49
        },
        {
            "id": 1,
            "cust_id": 10,
            "date": "2023-06-18",
            "amount": 70,
            "rewards": 20
        },
        {
            "id": 2,
            "cust_id": 1,
            "date": "2023-04-27",
            "amount": 270,
            "rewards": 390
        },
        {
            "id": 3,
            "cust_id": 12,
            "date": "2023-05-08",
            "amount": 109,
            "rewards": 68
        },
        {
            "id": 4,
            "cust_id": 9,
            "date": "2023-06-16",
            "amount": 160,
            "rewards": 170
        },
        {
            "id": 5,
            "cust_id": 7,
            "date": "2023-05-28",
            "amount": 164,
            "rewards": 178
        },
        {
            "id": 6,
            "cust_id": 4,
            "date": "2023-06-10",
            "amount": 226,
            "rewards": 302
        },
        {
            "id": 7,
            "cust_id": 12,
            "date": "2023-06-10",
            "amount": 31,
            "rewards": 0
        },
        {
            "id": 8,
            "cust_id": 9,
            "date": "2023-06-06",
            "amount": 251,
            "rewards": 352
        },
        {
            "id": 9,
            "cust_id": 3,
            "date": "2023-06-29",
            "amount": 90,
            "rewards": 40
        },
        {
            "id": 10,
            "cust_id": 4,
            "date": "2023-06-29",
            "amount": 93,
            "rewards": 43
        },
        {
            "id": 11,
            "cust_id": 9,
            "date": "2023-05-30",
            "amount": 185,
            "rewards": 220
        },
        {
            "id": 12,
            "cust_id": 6,
            "date": "2023-06-29",
            "amount": 62,
            "rewards": 12
        },
        {
            "id": 13,
            "cust_id": 12,
            "date": "2023-06-18",
            "amount": 22,
            "rewards": 0
        },
        {
            "id": 14,
            "cust_id": 2,
            "date": "2023-04-11",
            "amount": 89,
            "rewards": 39
        },
        {
            "id": 15,
            "cust_id": 12,
            "date": "2023-06-09",
            "amount": 15,
            "rewards": 0
        },
        {
            "id": 16,
            "cust_id": 3,
            "date": "2023-06-18",
            "amount": 46,
            "rewards": 0
        },
        {
            "id": 17,
            "cust_id": 6,
            "date": "2023-06-12",
            "amount": 253,
            "rewards": 356
        },
        {
            "id": 18,
            "cust_id": 3,
            "date": "2023-04-28",
            "amount": 120,
            "rewards": 90
        },
        {
            "id": 19,
            "cust_id": 11,
            "date": "2023-06-26",
            "amount": 59,
            "rewards": 9
        },
        {
            "id": 20,
            "cust_id": 7,
            "date": "2023-06-02",
            "amount": 291,
            "rewards": 432
        },
        {
            "id": 21,
            "cust_id": 6,
            "date": "2023-05-01",
            "amount": 126,
            "rewards": 102
        },
        {
            "id": 22,
            "cust_id": 12,
            "date": "2023-04-08",
            "amount": 216,
            "rewards": 282
        },
        {
            "id": 23,
            "cust_id": 10,
            "date": "2023-05-25",
            "amount": 27,
            "rewards": 0
        },
        {
            "id": 24,
            "cust_id": 4,
            "date": "2023-04-26",
            "amount": 272,
            "rewards": 394
        }
    ]
}

async function fakeCall() {
    return new Promise(res => {
        setTimeout(res, Math.random() * 1000);
    });
}


/*
    # I wrote a python script to generate the random transaction data above:

    import json
    from random import randint
    from datetime import datetime

    def generate_transactions():
        data = []
        for x in range(25):
            transaction = {
                "id": x,
                "cust_id": randint(1, 12),
                "date": datetime.strftime(datetime(2023, randint(4, 6), randint(1, 30)), "%Y-%m-%d"),
                "amount": randint(0, 300),
                "rewards": 0
            }

            if transaction["amount"] >= 50 and transaction["amount"] <= 100:
                transaction["rewards"] += transaction["amount"] - 50
            elif transaction["amount"] > 100:
                transaction["rewards"] += 50 + (2 * (transaction["amount"] - 100))

            data.append(transaction)

        return data

    random_data = generate_transactions()
    results = json.dumps(random_data, indent=4)

    print(results)
*/