import { LengthAdapter } from './adapters/LengthAdapter';

describe('LengthAdapter', () => {
  describe('Testando convert', () => {
    test('deve converter o comprimento para uma nova unidade', () => {
      const lengthAdapter = new LengthAdapter();
      lengthAdapter.create(100, 'cm');

      lengthAdapter.convert('m');

      expect(lengthAdapter.see()).toBe('1 m');
    });

    test('deve lançar um erro para uma conversão não suportada', () => {
      const lengthAdapter = new LengthAdapter();
      lengthAdapter.create(100, 'cm');

      expect(() => {
        lengthAdapter.convert('oz');
      }).toThrowError("Unidade de saída não suportada");
    });
  });

  describe('Testando create', () => {
    test('deve criar um novo comprimento com uma unidade válida', () => {
      const lengthAdapter = new LengthAdapter();
      lengthAdapter.create(10, 'cm');

      expect(lengthAdapter.see()).toBe('10 cm');
    });

    test('deve lançar um erro para uma unidade inválida', () => {
      const lengthAdapter = new LengthAdapter();

      expect(() => {
        lengthAdapter.create(10, 'unidade_invalida');
      }).toThrowError("Unidade de medida 'unidade_invalida' não suportada");
    });
  });

  describe('Testando mock de getOptions', () => {
    test('deve retornar as opções de unidade', () => {
      const lengthAdapter = new LengthAdapter();
      const mockOptions = ['mm', 'cm', 'm', 'km', 'pol', 'mi'];
      const getOptionsMock = jest.fn(() => mockOptions);

      lengthAdapter.getOptions = getOptionsMock;

      expect(lengthAdapter.getOptions()).toEqual(mockOptions);
      expect(getOptionsMock).toHaveBeenCalled();
    });
  });

  describe('Testando mock de see', () => {
    test('deve retornar a representação do comprimento', () => {
      const lengthAdapter = new LengthAdapter();
      const mockLength = {
        value: 50,
        unit: 'cm'
      };
      const seeMock = jest.fn(() => `${mockLength.value} ${mockLength.unit}`);

      lengthAdapter.see = seeMock;

      expect(lengthAdapter.see()).toBe(`${mockLength.value} ${mockLength.unit}`);
      expect(seeMock).toHaveBeenCalled();
    });
  });
});
