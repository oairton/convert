/* eslint-disable @typescript-eslint/no-explicit-any */
import readline from 'readline'
import { promisify } from 'util'
import { LengthAdapter } from './adapters/LengthAdapter'
import { WeightAdapter } from './adapters/WeightAdapter'

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
    
const userInput = promisify(reader.question).bind(reader)

async function getUserInput (prompt: string): Promise<any> {
    return await userInput(prompt)
}


async function startConverter () {

    console.log("Conversor de medidas. Escolha uma opcao:")

    const userChoise = await getUserInput('0 - Sair\n1 - Comprimento\n2 - Peso\nResposta: ')

    switch (userChoise) {
    case '0':
        reader.close()
        return

    case '1':
        const lengthAdapter = new LengthAdapter

        console.log("Essas sao as unidades de medida possiveis:")

        const lengthOptions = lengthAdapter.getOptions()

        lengthOptions.forEach(unit => console.log("- " + unit));

        const lengthUnit = await getUserInput("Qual unidade de medida?\nResposta: ")
        const lengthValue = await getUserInput("Qual valor?\nResposta: ")

        lengthAdapter.create(lengthValue, lengthUnit)

        const newLengthUnit = await getUserInput("Para qual unidade converter?\nResposta: ")

        lengthAdapter.convert(newLengthUnit)

        console.log(lengthAdapter.see())
        reader.close()
        return

    case '2':
        const weightAdapter = new WeightAdapter

        console.log("Essas sao as unidades de medida possiveis:")

        const weightOptions = weightAdapter.getOptions()

        weightOptions.forEach(unit => console.log("- " + unit));

        const weightUnit = await getUserInput("Qual unidade de medida?\nResposta: ")
        const weightValue = await getUserInput("Qual valor?\nResposta: ")

        weightAdapter.create(weightValue, weightUnit)

        const newWeightUnit = await getUserInput("Para qual unidade converter?\nResposta: ")

        weightAdapter.convert(newWeightUnit)

        console.log(weightAdapter.see())
        reader.close()
        return

    default:
        reader.close()
    }
}

startConverter()
