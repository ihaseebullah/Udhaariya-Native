import React from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../../../Theme/Context/Theme';

interface CustomDialogProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  visible,
  message,
  onClose,
  onConfirm,
  confirmText = 'OK',
}) => {
  const {Colors, font} = useTheme();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View
          style={[styles.dialogBox, {backgroundColor: Colors.CardBackground}]}>
          <Text
            style={[
              styles.message,
              {color: Colors.TextPrimary, fontFamily: font},
            ]}>
            {message}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.button, {backgroundColor: Colors.Secondary}]}>
              <Text style={[styles.buttonText, {color: Colors.TextSecondary}]}>
                Cancel
              </Text>
            </TouchableOpacity>
            {onConfirm && (
              <TouchableOpacity
                onPress={onConfirm}
                style={[styles.button, {backgroundColor: Colors.Primary}]}>
                <Text style={[styles.buttonText, {color: Colors.TextPrimary}]}>
                  {confirmText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialogBox: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CustomDialog;
