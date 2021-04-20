import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import InputBox from './InputBox';

function EditModal(props) {
  return (
    <Modal isOpen={props.isEditModalVisible} onClose={e => props.setIsEditModalVisible(false)}>
      <ModalOverlay />
      <Formik
        initialValues={{
          text: props.text,
          x: props.x,
          y: props.y,
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
        }}
        validate={values => {
          const errors = {};
          if (!values.text) {
            errors.text = 'Required';
          }
          if (!values.x) {
            errors.x = 'Required';
          }
          if (!values.y) {
            errors.y = 'Required';
          }
          if (!values.fontSize) {
            errors.fontSize = 'Required';
          }
          if (!values.fontWeight) {
            errors.fontWeight = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          props.onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
          <form onSubmit={handleSubmit}>
            <ModalContent>
              <ModalHeader>Edit</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <InputBox errors={errors} handleBlur={handleBlur} handleChange={handleChange} touched={touched}
                          values={values} label={'Text'} name={'text'} />
                <InputBox errors={errors} handleBlur={handleBlur} handleChange={handleChange} touched={touched}
                          values={values} label={'X'} name={'x'} />
                <InputBox errors={errors} handleBlur={handleBlur} handleChange={handleChange} touched={touched}
                          values={values} label={'Y'} name={'y'} />
                <InputBox errors={errors} handleBlur={handleBlur} handleChange={handleChange} touched={touched}
                          values={values} label={'Font Size'} name={'fontSize'} />
                <InputBox errors={errors} handleBlur={handleBlur} handleChange={handleChange} touched={touched}
                          values={values} label={'Font Weight'} name={'fontWeight'} />
              </ModalBody>

              <ModalFooter justifyContent={'flex-start'}>
                <Button colorScheme='blue' type='submit' isLoading={isSubmitting}>
                  Save Changes
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        )}
      </Formik>
    </Modal>
  );
}

EditModal.propTypes = {
  isEditModalVisible: PropTypes.bool,
  setIsEditModalVisible: PropTypes.func,
  onSubmit: PropTypes.func,
  text: PropTypes.string,
};

export default EditModal;
