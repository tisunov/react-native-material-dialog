import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  Platform,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import colors from './colors';

// TODO: Support custom actions
// TODO: Stacked full-width buttons

class ActionButton extends Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.actionContainer}
        underlayColor={colors.androidPressedUnderlay}
        onPress={this.props.onPress}>
        <Text
          style={[styles.actionText, { color: this.props.colorAccent } ]}>
          {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  }
}

export default class MaterialDialog extends Component {
  render() {
    return (
      <Modal
        animationType={'fade'}
        transparent
        hardwareAccelerated
        visible={this.props.visible}
        onRequestClose={this.props.onCancel}>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={[styles.backgroundOverlay, { backgroundColor: this.props.overlayColor }]}>
            <View style={[styles.modalContainer, {marginBottom: this.props.bottomMargin }]}>
              <TouchableWithoutFeedback>
                <View>
                  {this.props.title != null
                    ? <View
                        style={this.props.scrolled
                        ? styles.titleContainerScrolled
                        : styles.titleContainer}>
                        <Text
                          style={[styles.titleText, { color: this.props.titleColor }]}>
                          {this.props.title}
                        </Text>
                      </View>
                    : null}
                  <View
                    style={this.props.scrolled
                    ? styles.contentContainerScrolled
                    : styles.contentContainer}>
                    {this.props.children}
                  </View>
                  <View
                    style={this.props.scrolled
                    ? styles.actionsContainerScrolled
                    : styles.actionsContainer}>
                    
                    {this.props.onCancel != null && 
                      <ActionButton
                        colorAccent={colors.secondaryButtonTextColor}
                        onPress={this.props.onCancel}
                        label={this.props.cancelLabel} />
                    }

                    {this.props.onOk != null &&
                      <ActionButton
                        colorAccent={this.props.colorAccent}
                        onPress={this.props.onOk}
                        label={this.props.okLabel} />
                    }
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  backgroundOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundOverlay,
  },
  modalContainer: {
    marginHorizontal: 16,
    marginBottom: 115,
    paddingTop: 24,
    minWidth: 288,
    borderRadius: 2,
    backgroundColor: colors.background,
    ...Platform.select({
      android: {
        elevation: 24,
      },
      ios:  {
        shadowColor: "#000000",
        shadowOpacity: 0.16,
        shadowRadius: 5,
        shadowOffset: {
          height: 2,
          width: 2,
        },
      }
    })    
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainerScrolled: {
    paddingHorizontal: 24,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.androidBorderColor,
  },
  titleText: {
    fontSize: 20,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
      },
      ios:  {
        fontWeight: '600'
      }
    })
  },
  contentContainer: {
    flex: -1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  contentContainerScrolled: {
    flex: -1,
    paddingHorizontal: 24,
  },
  actionsContainer: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 8,
  },
  actionsContainerScrolled: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.androidBorderColor,
  },
  actionContainer: {
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    minWidth: 84,
    minHeight: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancel: {

  },
  actionText: {
    fontSize: 14,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium',
      },
      ios:  {
        fontWeight: '600'
      }
    })
  },
});

MaterialDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  cancelLabel: PropTypes.string,
  okLabel: PropTypes.string,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  colorAccent: PropTypes.string,
  scrolled: PropTypes.bool,
  overlayColor: PropTypes.string,
  bottomMargin: PropTypes.number,
}

MaterialDialog.defaultProps = {
  okLabel: 'OK',
  cancelLabel: 'CANCEL',
  titleColor: colors.androidPrimaryTextColor,
  colorAccent: colors.androidColorAccent,
  scrolled: false,
  overlayColor: colors.backgroundOverlay,
  bottomMargin: 115,
};

ActionButton.propTypes = {
  colorAccent: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
