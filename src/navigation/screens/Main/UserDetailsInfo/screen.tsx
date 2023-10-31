import React from 'react';
import {Keyboard, StyleProp, ViewProps, ViewStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AnyObjectSchema} from 'yup';

import {
  BackButton,
  Header,
  BackButtonIcon,
  HeaderRightDumbView,
  ContentCardContainer,
  ContentForm,
  ContentContainer,
  ContentUpdatedRowInfo,
} from './styles';
import {MainStackParamsType} from '../MainStackNavigation';
import {AppColors, isIos, theme} from '../../../../theme';
import {
  Avatar,
  ScreenTitle,
  SubmitBtn,
} from '../../../../components/common/styles';
import {
  ScreenNames,
  updateOrAddUserData,
  updateUserValidationScheme,
} from '../../../../utils';
import {useValidateFormikFields} from '../../../../hooks';
import {TValidateFormikFieldsField} from '../../../../types';
import {InputProps} from '../../../../components/common/Input/type';
import {IUser} from '../../../../types/models/IUser';

const EXTRA_HEIGHT_OFFSET = 150;

const SCREEN_TITLE = 'User Details';
const SUBMIT_BTN_TITLE = 'Save';

const FORM_FIRST_NAME_FIELD_NAME = 'firstName';
const FORM_LAST_NAME_FIELD_NAME = 'lastName';
const FORM_PHONE_FIELD_NAME = 'phone';
const FORM_EMAIL_FIELD_NAME = 'email';
const FORM_AGE_FIELD_NAME = 'age';

interface UserDetailsInfoScreenProps extends ViewProps {}
const defaultProps: UserDetailsInfoScreenProps = {};

export const UserDetailsInfoScreen: React.FC<
  UserDetailsInfoScreenProps
> = (): React.ReactElement => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamsType>>();
  const {params} =
    useRoute<RouteProp<MainStackParamsType, ScreenNames.UserDetailsInfo>>();

  const [lastUpdatedTime, setLastUpdatedTime] = React.useState<string>(
    params?.lastUpdated ?? '',
  );
  const [initValues, setInitValues] = React.useState<IUser | undefined>(params);
  const [isKeyboardOpen, setKeyboardOpen] = React.useState<boolean>(false);

  const avatarSize = React.useMemo((): number => theme.offsets.large * 4, []);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const commonInputProps = React.useMemo(
    (): Object => ({
      withMT: true,
      elementFieldStyle: {color: AppColors.DARK},
      required: false,
      withShadow: false,
      editable: true,
      withTouchRequiredToValidate: true,
    }),
    [],
  );

  const formFields = React.useMemo(
    (): TValidateFormikFieldsField<InputProps>[] => [
      {
        name: FORM_FIRST_NAME_FIELD_NAME,
        label: 'First Name',
        value: initValues?.name?.first ?? '',
        ...commonInputProps,
      } as TValidateFormikFieldsField<InputProps>,
      {
        name: FORM_LAST_NAME_FIELD_NAME,
        label: 'Last Name',
        value: initValues?.name?.last ?? '',
        ...commonInputProps,
      } as TValidateFormikFieldsField<InputProps>,
      {
        name: FORM_PHONE_FIELD_NAME,
        label: 'Phone',
        value: initValues?.phone ?? '',
        keyboardType: 'numeric',
        ...commonInputProps,
      } as TValidateFormikFieldsField<InputProps>,
      {
        name: FORM_EMAIL_FIELD_NAME,
        label: 'Email',
        value: initValues?.email ?? '',
        ...commonInputProps,
      } as TValidateFormikFieldsField<InputProps>,
      {
        name: FORM_AGE_FIELD_NAME,
        label: 'Age',
        value: initValues?.dob?.age?.toString() ?? '',
        keyboardType: 'numeric',
        ...commonInputProps,
      } as TValidateFormikFieldsField<InputProps>,
    ],
    [commonInputProps, initValues],
  );

  const contentContainerStyle = React.useMemo(
    (): StyleProp<ViewStyle> => ({
      paddingBottom: isIos ? 100 : isKeyboardOpen ? 300 : 150,
    }),
    [isKeyboardOpen],
  );

  const {FormFields, isValid, values} = useValidateFormikFields(
    formFields,
    false,
    () => undefined,
    updateUserValidationScheme as AnyObjectSchema,
  );

  const existingAnyFieldDiff = React.useMemo((): boolean => {
    let res = false;

    Object.keys(values).forEach(fieldName => {
      if (!res) {
        const oldValDataIndex = formFields.findIndex(
          item => item.name === fieldName,
        );
        const oldVal = formFields[oldValDataIndex]?.value ?? '';

        if (!oldVal?.trim?.() && (values as any)?.[fieldName]?.trim?.()) {
          res = true;
          return;
        }

        if (
          oldVal?.trim?.() &&
          (values as any)?.[fieldName]?.trim?.() &&
          oldVal.trim() !== (values as any)[fieldName].trim()
        ) {
          res = true;
          return;
        }
      }
    });

    return res;
  }, [values, formFields]);

  const isSubmitEnabled = React.useMemo(
    (): boolean => existingAnyFieldDiff && isValid,
    [isValid, existingAnyFieldDiff],
  );

  const handleSubmit = React.useCallback(async () => {
    const mewLastUpdatedTime: string = new Date().toString();
    let newData: IUser | undefined;

    setLastUpdatedTime(mewLastUpdatedTime);

    if (params) {
      newData = {
        ...params,
        name: {
          title: params?.name?.title ?? 'male',
          first: values?.firstName ?? '',
          last: values?.lastName ?? '',
        },
        phone: values?.phone ?? '',
        email: values?.email ?? '',
        dob: {
          date: params?.dob?.date ?? '',
          age: values?.age ? +values.age : 0,
        },
        lastUpdated: mewLastUpdatedTime,
      };

      setInitValues(newData);
      updateOrAddUserData(newData);
    }
  }, [values, params]);

  const renderForm = React.useMemo(
    (): React.ReactNode =>
      params ? (
        <>
          <ContentCardContainer>
            {params?.picture?.large ? (
              <Avatar source={{uri: params.picture.large}} size={avatarSize} />
            ) : null}

            <ContentForm>
              {FormFields}

              {lastUpdatedTime.trim() ? (
                <ContentUpdatedRowInfo updatedDate={lastUpdatedTime} isLive />
              ) : null}
            </ContentForm>
          </ContentCardContainer>

          <SubmitBtn
            title={SUBMIT_BTN_TITLE}
            disable={!isSubmitEnabled}
            onPress={handleSubmit}
            size={'xs'}
          />
        </>
      ) : null,
    [
      FormFields,
      avatarSize,
      handleSubmit,
      isSubmitEnabled,
      lastUpdatedTime,
      params,
    ],
  );

  return (
    <>
      <SafeAreaView edges={['top']} mode={'margin'}>
        <Header>
          <BackButton
            onPress={() => navigation.navigate(ScreenNames.Users, initValues)}>
            <BackButtonIcon fill={AppColors.PRIMARY} />
          </BackButton>

          <ScreenTitle>{SCREEN_TITLE}</ScreenTitle>

          <HeaderRightDumbView />
        </Header>
      </SafeAreaView>

      <ContentContainer
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false}
        enableAutomaticScroll={isIos}
        enableOnAndroid
        extraHeight={EXTRA_HEIGHT_OFFSET}>
        {renderForm}
      </ContentContainer>
    </>
  );
};

UserDetailsInfoScreen.defaultProps = defaultProps;
export default React.memo(UserDetailsInfoScreen);
