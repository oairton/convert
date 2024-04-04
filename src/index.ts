/* eslint-disable @typescript-eslint/no-explicit-any */
import readline from 'readline'
import { promisify } from 'util'
import { ConverterAdapter } from './adapters/ConverterAdapter'

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
    
const userInput = promisify(reader.question).bind(reader)

async function getUserInput (prompt: string): Promise<any> {
    return await userInput(prompt)
}


async function startConverter () {
    const adapter = new ConverterAdapter();

    console.log("Conversor de medidas. Escolha uma opcao:")

    const userChoise = await getUserInput('0 - Sair\n1 - Comprimento\n2 - Peso\n3 - Volume\n4 - Velocidade\n')

    switch (userChoise) {
    case '0':
        reader.close()
        return

    case '1':
        var value = await adapter.convert_length(7, "cm", "mm")
        console.log(value)
        reader.close()
        return

    case '2':
        await adapter.convert_length(7, "cm", "mm")
        reader.close()
        return

    case '3':
        await adapter.convert_length(7, "cm", "mm")
        reader.close()
        return

    case '4':
        await adapter.convert_length(7, "cm", "mm")
        reader.close()
        return

    default:
        reader.close()
    }
}

startConverter()