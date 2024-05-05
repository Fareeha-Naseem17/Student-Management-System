#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bgBlue(`\tWelcome to the Student Management System!`));

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);

const promptStudentInfo = async () => {
    
    const answer = await inquirer.prompt([
        {
            name: "students",
            type: "input",
            message: chalk.yellow("Enter Student's Name:"),
            validate: function (value) {
                return value.trim() !== "" ? true : chalk.red("Please provide a name of the Student.");
            },
        },
        {
            name: "courses",
            type: "list",
            message: chalk.magenta("Select the Course to Enroll"),
            choices: ["HTML/CSS", "Javascript", "React.js", "Typescript", "Python", "MongoDB"]
        }
    ]);
    return answer;
};

const main = async () => {
    try {
        const studentInfo = await promptStudentInfo();

        const tutionFee: { [key: string]: number } = {
            "HTML/CSS": 2500,
            "Javascript": 5000,
            "Typescript": 6000,
            "Python": 10000,
            "MongoDB": 7000,
            "React.js": 8000,
        };

        
        const balanceInput = await inquirer.prompt([
            {
                name: "balance",
                type: "input",
                message: "Enter your balance:",
                validate: function (value) {
                    return !isNaN(parseFloat(value)) && parseFloat(value) >= 0 ? true : chalk.red("Please enter a valid balance.");
                },
            }
        ]);
        let myBalance: number = parseFloat(balanceInput.balance);

        console.log(`\nTuition Fees: ${tutionFee[studentInfo.courses]}/-\n`);
        console.log(`Balance: ${myBalance}\n`);

        const paymentType = await inquirer.prompt([
            {
                name: "payment",
                type: "list",
                message: chalk.blue("Select Payment Method"),
                choices: ["Bank Transfer", "Easypaisa", "Jazzcash", "PayPal", "Credit Card"]
            },
            {
                name: "amount",
                type: "input",
                message: "Transfer Money:",
                validate: function (value) {
                    return !isNaN(parseFloat(value)) && parseFloat(value) > 0 ? true : chalk.red("Please enter a Valid Amount.");
                },
            }
        ]);

        const tutionFees = tutionFee[studentInfo.courses];
        const paymentAmount = parseFloat(paymentType.amount);

        if (myBalance >= paymentAmount && tutionFees === paymentAmount) {
            console.log(chalk.green(`\nPayment Transferred Successfully!\n`));

            console.log(chalk.magentaBright(`Congratulations! You have been enrolled in ${studentInfo.courses}.\n`));

            let ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "Choose your next step:",
                    choices: ["View Status", "Quit"]
                }
            ])

            if (ans.select === "View Status") {
                console.log(chalk.yellowBright("\n<<<<<<STATUS>>>>>>\n"));
                console.log(`Student Name: ${studentInfo.students}`);
                console.log(`Student ID: ${randomNumber}`);
                console.log(`Course: ${studentInfo.courses}`);
                console.log(`Tuition Fees Paid: ${paymentAmount}`);
                myBalance -= paymentAmount; 
                console.log(`Remaining Balance: ${myBalance}`);
            }

        } else {
            console.log(chalk.red("Invalid Amount\n"));
        }
    } catch (error: any) {
        console.error(chalk.red("An error occurred:", error.message));
    }
};

main();
