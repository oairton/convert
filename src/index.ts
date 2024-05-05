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

    const userChoise = await getUserInput('\n1 - Comprimento\n2 - Peso\n0 - Sair\nResposta: ')

    switch (userChoise) {

    case '0':
        reader.close()
        return

    case '1':
        const lengthAdapter = new LengthAdapter

        console.log("\nEssas sao as unidades de medida possiveis:")

        const lengthOptions = lengthAdapter.getOptions()

        lengthOptions.forEach(unit => console.log("-> " + unit));

        const lengthUnit = await getUserInput("\nQual unidade de medida?\nResposta: ")
        const lengthValue = await getUserInput("\nQual valor?\nResposta: ")

        lengthAdapter.create(lengthValue, lengthUnit)

        const newLengthUnit = await getUserInput("\nPara qual unidade converter?\nResposta: ")

        lengthAdapter.convert(newLengthUnit)

        console.log(lengthAdapter.see())
        reader.close()
        return

    case '2':
        const weightAdapter = new WeightAdapter

        console.log("\nEssas sao as unidades de medida possiveis:")

        const weightOptions = weightAdapter.getOptions()

        weightOptions.forEach(unit => console.log("-> " + unit));

        const weightUnit = await getUserInput("\nQual unidade de medida?\nResposta: ")
        const weightValue = await getUserInput("\nQual valor?\nResposta: ")

        weightAdapter.create(weightValue, weightUnit)

        const newWeightUnit = await getUserInput("\nPara qual unidade converter?\nResposta: ")

        weightAdapter.convert(newWeightUnit)

        console.log(weightAdapter.see())
        reader.close()
        return

    default:
        reader.close()
    }
}

startConverter()
