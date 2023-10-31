import React from 'react';
import {RoundedCardDetailsInfoWithShadowAndBorderLayout} from '../../../layouts';
import {Avatar, RowDetailsInfo, RowInfo, UpdatedLiveTimer} from '../../common';
import {AppSizes, theme} from '../../../theme';
import {Button} from './style';
import {DEFAULT_ACTIVE_OPACITY_BTN} from '../../../utils';
import {UserCardProps, defaultProps} from './type';

export const UserCard: React.FC<UserCardProps> = ({
  gender,
  name,
  email,
  phone,
  age,
  picture,
  lastUpdated,
  isVisable,
  onPress,
}): React.ReactElement => {
  const avatarSize = React.useMemo((): number => theme.offsets.large * 2, []);

  return (
    <Button onPress={onPress} activeOpacity={DEFAULT_ACTIVE_OPACITY_BTN}>
      <RoundedCardDetailsInfoWithShadowAndBorderLayout
        marginBottom={AppSizes.SMALL}>
        {picture ? (
          <RowInfo>
            <Avatar
              size={avatarSize}
              source={{uri: picture}}
              resizeMode="cover"
            />
          </RowInfo>
        ) : null}

        <RowDetailsInfo
          label="Gender"
          text={gender[0].toUpperCase() + gender.substring(1)}
        />

        <RowDetailsInfo label="Fullname" text={name} />

        {email ? <RowDetailsInfo label="Email" text={email} /> : null}

        {phone ? <RowDetailsInfo label="Phone numb" text={phone} /> : null}

        {age ? <RowDetailsInfo label="Age" text={age.toString()} /> : null}

        {lastUpdated ? (
          <UpdatedLiveTimer updatedDate={lastUpdated} isLive={!!isVisable} />
        ) : null}
      </RoundedCardDetailsInfoWithShadowAndBorderLayout>
    </Button>
  );
};

UserCard.defaultProps = defaultProps;
export default React.memo(UserCard);
