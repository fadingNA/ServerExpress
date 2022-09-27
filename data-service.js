/**
 * Module Data
 * The following two arrays should be declared "globally" within your module:
 */

//global
const fs = require("fs"); // to open fileSystem
let emp = [];
let depart = [];
const errorMessage = "no results returned.";

module.exports.initialize = function () {
    let promise = new Promise((resolve, reject) => {
        try {
            fs.readFile("./data/employees.json", 'utf8', (errorFile, dataFile) => {
                if (errorFile) {
                    throw "Load fail.";
                } else {
                    emp = JSON.parse(dataFile);
                }
            })
            fs.readFile("./data/departments.json", 'utf8', (errorFile, dataFile) => {
                if (errorFile) {
                    throw "Load fail.";
                } else {
                    depart = JSON.parse(dataFile);
                }
            });
        } catch (errorFile) {
            console.log("load data fail!");
            reject("unable to read file.");
        }
        resolve("Operation was a success");
    })
    console.log("Congratulation! load have succeed!.");
    return promise;
};

module.exports.getAllEmployees = function () {
    return new Promise((resolve, reject) => {
        if (emp.length === 0) {
            reject(errorMessage);
        }
        resolve(emp);
        // to print in terminal
        console.log(emp);
    });
}

module.exports.getManagers = function () {
    let boss = [];
    return new Promise((resolve, reject) => {
        for (let i = 0; i < emp.length; ++i) {
            // isManager is boolean set in employees.json <- NOTE!
            if (emp[i].isManager) {
                boss[i] = emp[i];
            }
        }
        if (boss.length === 0) {
            reject(errorMessage);
        }
        resolve(boss);
        //debug boss;
        // to print in terminal
        console.log(boss);
    });
}

module.exports.getDepartments = function () {
    return new Promise((resolve, reject) => {
        if (depart.length === 0) {
            reject(errorMessage);
        }
        //depart = JSON.parse(data);
        resolve(depart);
        // to print in terminal
        console.log(depart);
    });
}
