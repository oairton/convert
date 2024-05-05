import { WeightAdapter } from './adapters/WeightAdapter';

describe('WeightAdapter', () => {
  describe('Testing convert', () => {
    test('should convert the weight to a new unit', () => {
      const weightAdapter = new WeightAdapter();
      weightAdapter.create(100, 'g');

      weightAdapter.convert('kg');

      expect(weightAdapter.see()).toBe('0.1 kg');
    });

    test('should throw an error for unsupported conversion', () => {
      const weightAdapter = new WeightAdapter();
      weightAdapter.create(100, 'g');

      expect(() => {
        weightAdapter.convert('cm');
      }).toThrowError("Unidade de saída não suportada");
    });
  });

  describe('Testing create', () => {
    test('should create a new weight with a valid unit', () => {
      const weightAdapter = new WeightAdapter();
      weightAdapter.create(10, 'g');

      expect(weightAdapter.see()).toBe('10 g');
    });

    test('should throw an error for an invalid unit', () => {
      const weightAdapter = new WeightAdapter();

      expect(() => {
        weightAdapter.create(10, 'invalid_unit');
      }).toThrowError("Unidade de medida 'invalid_unit' não suportada");
    });
  });

  describe('Testing mock of getOptions', () => {
    test('should return unit options', () => {
      const weightAdapter = new WeightAdapter();
      const mockOptions = ['g', 'kg', 't', 'oz', 'lb'];
      const getOptionsMock = jest.fn(() => mockOptions);

      weightAdapter.getOptions = getOptionsMock;

      expect(weightAdapter.getOptions()).toEqual(mockOptions);
      expect(getOptionsMock).toHaveBeenCalled();
    });
  });

  describe('Testing mock of see', () => {
    test('should return the weight representation', () => {
      const weightAdapter = new WeightAdapter();
      const mockWeight = {
        value: 50,
        unit: 'g'
      };
      const seeMock = jest.fn(() => `${mockWeight.value} ${mockWeight.unit}`);

      weightAdapter.see = seeMock;

      expect(weightAdapter.see()).toBe(`${mockWeight.value} ${mockWeight.unit}`);
      expect(seeMock).toHaveBeenCalled();
    });
  });
});
