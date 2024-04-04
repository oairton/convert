export class ConverterAdapter {
    convert_length(quantity: number, inputUnit: string, outputUnit: string): number {
        const conversionData: { [key: string]: { [key: string]: number } } = {
            "mm": {
                "mm": 1,
                "cm": 0.1,
                "m": 0.001,
                "km": 1e-6,
                "pol": 0.0393701,
                "mi": 6.2137e-7
            },
            "cm": {
                "mm": 10,
                "cm": 1,
                "m": 0.01,
                "km": 1e-5,
                "pol": 0.393701,
                "mi": 6.2137e-5
            },
            "m": {
                "mm": 1000,
                "cm": 100,
                "m": 1,
                "km": 0.001,
                "pol": 39.3701,
                "mi": 0.000621371
            },
            "km": {
                "mm": 1e+6,
                "cm": 1e+5,
                "m": 1000,
                "km": 1,
                "pol": 39370.1,
                "mi": 0.621371
            },
            "pol": {
                "mm": 25.4,
                "cm": 2.54,
                "m": 0.0254,
                "km": 2.54e-5,
                "pol": 1,
                "mi": 1.5783e-5
            },
            "mi": {
                "mm": 1609344,
                "cm": 160934,
                "m": 1609.34,
                "km": 1.60934,
                "pol": 63360,
                "mi": 1
            }
        };

        if (!conversionData[inputUnit]) {
            throw new Error("Unidade de entrada não suportada");
        }

        if (!conversionData[outputUnit]) {
            throw new Error("Unidade de saída não suportada");
        }

        if (!conversionData[inputUnit][outputUnit]) {
            throw new Error("Conversão de " + inputUnit + " para " + outputUnit + " não suportada");
        }

        return quantity * conversionData[inputUnit][outputUnit];
    }
}