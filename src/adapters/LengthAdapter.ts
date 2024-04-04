import { Length } from "../models/Length";

export class LengthAdapter {
    length: Length = {
        value: 0,
        unit: "cm"
    }

    conversionData: { [key: string]: { [key: string]: number } } = {
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
    

    convert(newUnit: string) {
        if (!this.conversionData[newUnit]) {
            throw new Error("Unidade de saída não suportada");
        }

        if (!this.conversionData[this.length.unit][newUnit]) {
            throw new Error("Conversão de " + this.length.unit + " para " + newUnit + " não suportada");
        }

        this.length.value = this.length.value * this.conversionData[this.length.unit][newUnit]

        this.length.unit = newUnit
    }

    update(newValue: number) {
        this.length.value = newValue
    }

    create(value: number, unit: string) {
        if (!this.conversionData[unit]) {
            throw new Error("Unidade de medida '" + unit + "' não suportada");
        }
        this.length.value = value
        this.length.unit = unit
    }

    getOptions() {
        const lengthAdapter = new LengthAdapter();
        const supportedUnits = Object.keys(lengthAdapter.conversionData);
    
        return supportedUnits
    }

    see() {
        let result = ""
        result += this.length.value + " "
        result + this.length.unit
        return result
    }
}
