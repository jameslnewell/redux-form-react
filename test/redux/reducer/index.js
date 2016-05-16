import reducer from '../../../src/redux/reducer';
import {
  FOCUS, BLUR, CHANGE,
  FILTER, VALIDATE, SUBMIT
} from '../../../src/constants';

const FORM = 'profile';
const FIELD = 'firstName';

describe('reducer()', () => {

  describe('FOCUS', () => {

    it('should set .active to true', () => {

      const state = reducer({}, {
        type: FOCUS,
        meta: {
          form: FORM,
          field: FIELD
        }
      });

      expect(state[FORM].fields[FIELD]).to.have.property('active', true);

    });

  });

  describe('BLUR', () => {

    it('should set .active to false', () => {

      const state = reducer({}, {
        type: BLUR,
        meta: {
          form: FORM,
          field: FIELD
        }
      });

      expect(state[FORM].fields[FIELD]).to.have.property('active', false);

    });

  });

  describe('CHANGE', () => {

    it('should set .value', () => {

      const state = reducer({}, {
        type: CHANGE,
        payload: 'John',
        meta: {
          form: FORM,
          field: FIELD
        }
      });

      expect(state[FORM].fields[FIELD]).to.have.property('value', 'John');

    });

  });

  describe('FILTER', () => {

    describe('=> when filtration has started', () => {

      it('should set .filtering to true', () => {

        const state = reducer({}, {
          type: FILTER,
          status: 'start',
          meta: {
            form: FORM,
            field: FIELD
          }
        });

        expect(state[FORM].fields[FIELD]).to.have.property('filtering', true);

      });

    });

    describe('=> when filtration has finished', () => {

      it('should set .value', () => {

        const state = reducer({}, {
          type: FILTER,
          status: 'finish',
          payload: 'John',
          meta: {
            form: FORM,
            field: FIELD
          }
        });

        expect(state[FORM].fields[FIELD]).to.have.property('value', 'John');

      });

      it('should set .filtering to false', () => {

        const state = reducer({}, {
          type: FILTER,
          status: 'finish',
          payload: 'John',
          meta: {
            form: FORM,
            field: FIELD
          }
        });

        expect(state[FORM].fields[FIELD]).to.have.property('filtering', false);

      });

      it('should set .filtered to true', () => {

        const state = reducer({}, {
          type: FILTER,
          status: 'finish',
          payload: 'John',
          meta: {
            form: FORM,
            field: FIELD
          }
        });

        expect(state[FORM].fields[FIELD]).to.have.property('filtered', true);

      });

    });

    describe('=> when filtration has errored', () => {

      it('should not set .value', () => {

        const state = reducer({}, {
          type: FILTER,
          status: 'error',
          payload: new Error('Fail!'),
          meta: {
            form: FORM,
            field: FIELD
          }
        });

        expect(state[FORM].fields[FIELD]).not.to.have.property('value');

      });

      it('should set .filtering to false', () => {

        const state = reducer({}, {
          type: FILTER,
          status: 'error',
          payload: new Error('Fail!'),
          meta: {
            form: FORM,
            field: FIELD
          }
        });

        expect(state[FORM].fields[FIELD]).to.have.property('filtering', false);

      });

      it('should set .error', () => {

        const state = reducer({}, {
          type: FILTER,
          status: 'error',
          payload: new Error('Fail!'),
          meta: {
            form: FORM,
            field: FIELD
          }
        });

        expect(state[FORM].fields[FIELD]).to.have.property('error', 'Fail!');

      });

    });

  });

  describe('VALIDATE', () => {

    describe('=> when validation has started', () => {

      it('should set .validating to true', () => {

        const state = reducer({}, {
          type: VALIDATE,
          status: 'start',
          meta: {
            form: FORM,
            field: FIELD
          }
        });

        expect(state[FORM].fields[FIELD]).to.have.property('validating', true);

      });

    });

    describe('=> when validation has finished', () => {

      describe('=> when the value is valid', () => {

        it('should set .validating to false', () => {

          const state = reducer({}, {
            type: VALIDATE,
            status: 'finish',
            payload: true,
            meta: {
              form: FORM,
              field: FIELD
            }
          });

          expect(state[FORM].fields[FIELD]).to.have.property('validating', false);

        });

        it('should set .validated to true', () => {

          const state = reducer({}, {
            type: VALIDATE,
            status: 'finish',
            payload: true,
            meta: {
              form: FORM,
              field: FIELD
            }
          });

          expect(state[FORM].fields[FIELD]).to.have.property('validated', true);

        });

        it('should set .valid to true', () => {

          const state = reducer({}, {
            type: VALIDATE,
            status: 'finish',
            payload: true,
            meta: {
              form: FORM,
              field: FIELD
            }
          });

          expect(state[FORM].fields[FIELD]).to.have.property('valid', true);

        });

        it('should set .lastValidValue', () => {

          const state = reducer({[FORM]: {fields: {[FIELD]: {value: 'John'}}}}, {
            type: VALIDATE,
            status: 'finish',
            payload: true,
            meta: {
              form: FORM,
              field: FIELD
            }
          });

          expect(state[FORM].fields[FIELD]).to.have.property('lastValidValue', 'John');

        });

        it('should set .error to undefined', () => {

          const state = reducer({}, {
            type: VALIDATE,
            status: 'finish',
            payload: true,
            meta: {
              form: FORM,
              field: FIELD
            }
          });

          expect(state[FORM].fields[FIELD].error).to.not.exist;

        });

      });

      describe('=> when the value is invalid', () => {

        it('should set .validating to false', () => {

          const state = reducer({}, {
            type: VALIDATE,
            status: 'finish',
            payload: 'Invalid.',
            meta: {
              form: FORM,
              field: FIELD
            }
          });

          expect(state[FORM].fields[FIELD]).to.have.property('validating', false);

        });

        it('should set .validated to true', () => {

          const state = reducer({}, {
            type: VALIDATE,
            status: 'finish',
            payload: 'Invalid!',
            meta: {
              form: FORM,
              field: FIELD
            }
          });

          expect(state[FORM].fields[FIELD]).to.have.property('validated', true);

        });

        it('should set .valid to false', () => {

          const state = reducer({}, {
            type: VALIDATE,
            status: 'finish',
            payload: 'Invalid!',
            meta: {
              form: FORM,
              field: FIELD
            }
          });

          expect(state[FORM].fields[FIELD]).to.have.property('valid', false);

        });

        it('should not set .lastValidValue', () => {

          const state = reducer({[FORM]: {fields: {[FIELD]: {value: 'John'}}}}, {
            type: VALIDATE,
            status: 'finish',
            payload: 'Invalid!',
            meta: {
              form: FORM,
              field: FIELD
            }
          });

          expect(state[FORM].fields[FIELD]).not.to.have.property('lastValidValue');

        });

        it('should set .error', () => {

          const state = reducer({}, {
            type: VALIDATE,
            status: 'finish',
            payload: 'Invalid.',
            meta: {
              form: FORM,
              field: FIELD
            }
          });

          expect(state[FORM].fields[FIELD]).to.have.property('error', 'Invalid.');

        });

      });

    });

    describe('=> when validation has errored', () => {

      it('should set .error', () => {

        const state = reducer({}, {
          type: VALIDATE,
          status: 'error',
          payload: new Error('Failure!'),
          meta: {
            form: FORM,
            field: FIELD
          }
        });

        expect(state[FORM].fields[FIELD]).to.have.property('error', 'Failure!');

      });

    });

  });

  describe('SUBMIT', () => {

    describe('=> when submission has started', () => {

      it('should set .submitting to true', () => {

        const state = reducer({}, {
          type: SUBMIT,
          status: 'start',
          meta: {
            form: FORM
          }
        });

        expect(state[FORM]).to.have.property('submitting', true);

      });

    });

    describe('=> when submission has finished', () => {

      it('should set .submitting to false', () => {

        const state = reducer({}, {
          type: SUBMIT,
          status: 'finish',
          meta: {
            form: FORM
          }
        });

        expect(state[FORM]).to.have.property('submitting', false);

      });

      it('should set .submitted to true', () => {

        const state = reducer({}, {
          type: SUBMIT,
          status: 'finish',
          meta: {
            form: FORM
          }
        });

        expect(state[FORM]).to.have.property('submitted', true);

      });

      it('should set .error to undefined', () => {

        const state = reducer({}, {
          type: SUBMIT,
          status: 'finish',
          meta: {
            form: FORM
          }
        });

        expect(state[FORM].error).to.not.exist;

      });

    });

    describe('=> when submission has errored', () => {

      it('should set .submitting to false', () => {

        const state = reducer({}, {
          type: SUBMIT,
          status: 'error',
          payload: 'Error!',
          meta: {
            form: FORM
          }
        });

        expect(state[FORM]).to.have.property('submitting', false);

      });

      it('should set .error', () => {

        const state = reducer({}, {
          type: SUBMIT,
          status: 'error',
          payload: new Error('Error!'),
          meta: {
            form: FORM
          }
        });

        expect(state[FORM]).to.have.property('error', 'Error!');

      });

    });

  });

  describe('.plugin', () => {

    it('should reduce state based on the function provided into the plugin', () => {

      const initialState = {
        personalDetails: {
          fields: {
            field1: {value: 'value1'},
            field2: {value: 'value2'}
          }
        }
      };

      const customReducer = reducer.plugin({
        personalDetails: (state) => ({...state, fields: {...state.fields, field1: {}}}) //reset field1
      });

      const finalState = customReducer(initialState);

      expect(finalState).to.be.ok;
      expect(finalState).to.deep.equal({
        personalDetails: {
          fields: {
            field1: {},
            field2: {value: 'value2'}
          }}
      });
    });

    //TODO: more tests

  });

});