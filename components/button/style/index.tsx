import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { DerivativeToken, useStyleRegister, useToken } from '../../_util/theme';

// =============================== Type ===============================
const genSharedButtonStyle = (token: DerivativeToken): CSSObject => ({
  position: 'relative',
  display: 'inline-block',
  fontWeight: 400,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  backgroundImage: 'none',
  border: `${token.borderWidth}px ${token.borderStyle} transparent`,
  cursor: 'pointer',
  transition: token.easeInOut,
  userSelect: 'none',
  touchAction: 'manipulation',

  '> span': {
    display: 'inline-block',
  },
});

const genSolidButtonStyle = (token: DerivativeToken): CSSObject => {
  const paddingVertical = Math.max(
    0,
    (token.height - token.fontSize * token.lineHeight) / 2 - token.borderWidth,
  );
  const paddingHorizontal = token.padding - token.borderWidth;

  return {
    ...genSharedButtonStyle(token),

    lineHeight: token.lineHeight,
    borderRadius: token.borderRadius,
    backgroundColor: token.primaryColor,

    color: '#FFF',
    fontSize: token.fontSize,
    height: token.height,

    padding: `${paddingVertical}px ${paddingHorizontal}px`,
  };
};

// Default
const genDefaultButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  patchCls: string,
  token: DerivativeToken,
): CSSInterpolation => ({
  [`.${prefixCls}${patchCls}`]: {
    ...genSolidButtonStyle(token),

    backgroundColor: token.componentBackground,
    color: token.textColor,
    borderColor: token.borderColor,

    boxShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',

    // Leave a space between icon and text.
    [`> .${iconPrefixCls} + span, > span + .${iconPrefixCls}`]: {
      marginInlineStart: token.marginXS,
    },
  },
});

// Primary
const genPrimaryButtonStyle = (
  prefixCls: string,
  patchCls: string,
  token: DerivativeToken,
): CSSInterpolation => ({
  [`.${prefixCls}-primary${patchCls}`]: {
    ...genSolidButtonStyle(token),

    boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',

    borderColor: token.primaryColor,
  },
});

// Dashed
const genDashedButtonStyle = (prefixCls: string, patchCls: string): CSSInterpolation => ({
  [`.${prefixCls}-dashed${patchCls}`]: {
    borderStyle: 'dashed',
  },
});

// Text
const genTextButtonStyle = (prefixCls: string, patchCls: string): CSSInterpolation => ({
  [`.${prefixCls}-text${patchCls}`]: {
    borderColor: 'transparent',
  },
});

// Link
const genLinkButtonStyle = (
  prefixCls: string,
  patchCls: string,
  token: DerivativeToken,
): CSSInterpolation => ({
  [`.${prefixCls}-link${patchCls}`]: {
    borderColor: 'transparent',

    color: token.linkColor,
  },
});

// ============================== Shape ===============================
const genCircleButtonStyle = (
  prefixCls: string,
  patchCls: string,
  token: DerivativeToken,
): CSSInterpolation => ({
  [`.${prefixCls}-circle${patchCls}`]: {
    minWidth: token.height,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: '50%',
  },
});

const genRoundButtonStyle = (
  prefixCls: string,
  patchCls: string,
  token: DerivativeToken,
): CSSInterpolation => ({
  [`.${prefixCls}-round${patchCls}`]: {
    [`&, &.${prefixCls}-icon-only`]: {
      borderRadius: token.height,
      paddingLeft: token.height / 2,
      paddingRight: token.height / 2,
      width: 'auto',
    },
  },
});

// =============================== MISC ===============================
const genIconOnlyButtonStyle = (
  prefixCls: string,
  patchCls: string,
  token: DerivativeToken,
): CSSInterpolation => ({
  [`.${prefixCls}-icon-only${patchCls}`]: {
    width: token.height,
    paddingLeft: 0,
    paddingRight: 0,

    '> span': {
      transform: 'scale(1.143)', // 14px -> 16px
    },
  },
});

const genButtonLoadingStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => ({
  [`.${prefixCls}-loading`]: {
    [`&-icon > .${iconPrefixCls}`]: {
      marginInlineEnd: token.marginXS,
    },
  },
});

// =============================== Size ===============================
const genSizeButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  sizePrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const patchCls = sizePrefixCls ? `.${sizePrefixCls}` : '';

  return [
    // Type
    genDefaultButtonStyle(prefixCls, iconPrefixCls, patchCls, token),
    genPrimaryButtonStyle(prefixCls, patchCls, token),
    genDashedButtonStyle(prefixCls, patchCls),
    genTextButtonStyle(prefixCls, patchCls),
    genLinkButtonStyle(prefixCls, patchCls, token),

    // Shape
    genCircleButtonStyle(prefixCls, patchCls, token),
    genRoundButtonStyle(prefixCls, patchCls, token),

    // MISC
    genIconOnlyButtonStyle(prefixCls, patchCls, token),
  ];
};

const genSizeBaseButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => genSizeButtonStyle(prefixCls, iconPrefixCls, '', token);

const genSizeSmallButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const largeToken: DerivativeToken = {
    ...token,
    height: token.heightSM,
    padding: token.paddingXS,
  };

  return genSizeButtonStyle(prefixCls, iconPrefixCls, `${prefixCls}-sm`, largeToken);
};

const genSizeLargeButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const largeToken: DerivativeToken = {
    ...token,
    height: token.heightLG,
    fontSize: token.fontSizeLG,
  };

  return genSizeButtonStyle(prefixCls, iconPrefixCls, `${prefixCls}-lg`, largeToken);
};

export default function useStyle(prefixCls: string) {
  const [theme, token, iconPrefixCls, hashId] = useToken();

  useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
    // Size (Type, Shape, MISC)
    genSizeSmallButtonStyle(prefixCls, iconPrefixCls, token),
    genSizeBaseButtonStyle(prefixCls, iconPrefixCls, token),
    genSizeLargeButtonStyle(prefixCls, iconPrefixCls, token),

    // Loading
    genButtonLoadingStyle(prefixCls, iconPrefixCls, token),
  ]);
}
