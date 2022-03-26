import styled from '@emotion/styled';
import dot from '../image/icon/dot.png';
import { MQ, mq, HexToRGB } from './Utils';

import './_global.scss';

export const MainWrapper = styled.div({
  position: 'relative',
  overflow: 'hidden',
  margin: '0 auto',
  padding: '70px 0 30px',
  maxWidth: 2040,
});

export const ContentWrapper = styled.div(
  {
    position: 'relative',
    backgroundColor: process.env.COLOR_BACKGROUND,
    minHeight: 500,
    zIndex: 20,
    width: '100%',
    padding: '40px 20px 0px 20px',
    [MQ('960')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
  (props) => ({
    borderTopLeftRadius: props.isOnTop ? 20 : 0,
    borderTopRightRadius: props.isOnTop ? 20 : 0,
    marginTop: props.isOnTop ? -20 : 0,
    [MQ('960')]: {
      display: props.isWrapperFlex ? 'flex' : 'block',
      minHeight:
        props.hasSidebar && props.isHome
          ? 1100
          : props.hasSidebar && !props.isHome
          ? 600
          : 'auto',
      padding: '40px 20px 0px 20px',
    },
    [MQ('1200')]: {
      padding: props.hasSidebar ? '40px 110px 0px 20px' : '40px 20px 0px 20px',
    },
  })
);

export const LoadMore = styled.div({
  marginTop: 24,
  textAlign: 'right',
});

export const Spacer = styled.div({}, (props) => ({
  height: props.space,
}));

export const CommonSectionTitle = styled.h2({
  position: 'relative',
  color: process.env.COLOR_TEXT,
  fontWeight: 700,
  fontSize: 36,
  margin: '10px 0 25px',
  '> span': {
    position: 'relative',
    backgroundColor: process.env.COLOR_BACKGROUND,
    zIndex: 4,
    paddingRight: 12,
  },
  [MQ('960')]: {
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: 4,
      zIndex: 1,
      backgroundImage: `url(${dot})`,
      backgroundRepeat: 'repeat-x',
      backgroundSize: '21px',
    },
  },
});

export const CommonLabel = styled.div(
  {
    color: process.env.COLOR_TEXT,
    fontWeight: 'bold',
    fontSize: 13,
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  (props) => ({
    [MQ('600')]: {
      textAlign: props.center ? 'center' : null,
    },
  })
);

export const ShowPasswordInput = styled.div({
  background: process.env.GREY_VARIANT,
  width: 50,
  height: 47,
  marginRight: -13,
  borderTopRightRadius: 9,
  borderBottomRightRadius: 9,
  lineHeight: '50px',
  textAlign: 'center',
  cursor: 'pointer',
});

export const MarginSpinnerStyle = {
  margin: '60px 0',
};

export const FlexGrowOuter = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '100%',
  width: '100%',
  height: '100%',
});

export const FlexGrowFirst = styled.div({
  flexGrow: '1',
});

// CUSTOM TABLE

export const CustomTable = styled.div({
  display: 'table',
  width: '100%',
});

export const CustomTableCell = styled.div(
  {
    display: 'table-cell',
    lineHeight: '20px',
    verticalAlign: 'middle',
    fontSize: 9,
    [MQ('600')]: {
      fontSize: 12,
    },
    [MQ('1200')]: {
      fontSize: 13,
    },
    [MQ('400')]: {
      fontSize: 10,
    },
  },
  (props) => ({
    fontWeight: props.bold ? 700 : 400,
    color: props.primary ? process.env.COLOR_PRIMARY : null,
    width: props.first ? 60 : props.cardNumber ? 120 : null,
    [MQ('600')]: {
      width: props.first ? 80 : props.cardNumber ? 140 : null,
    },
    [MQ('960')]: {
      width: 'auto',
      paddingLeft: props.first ? 40 : 0,
    },
  })
);

export const CustomTableCellHeader = styled(CustomTableCell)({
  display: 'none',
  [MQ('450')]: {
    display: 'table-cell',
  },
});

export const CustomTableCellValue = styled(CustomTableCell)({
  display: 'block',
  [MQ('450')]: {
    display: 'table-cell',
  },
});

export const CustomTableHead = styled.div({
  [CustomTableCell]: {},
});

export const CustomTableRow = styled.div({
  tableLayout: 'fixed',
  display: 'table',
  width: '100%',
  padding: '10px',
  borderRadius: 10,
  position: 'relative',
});

export const CustomTableBody = styled.div({});

export const Stake = styled.div({ display: 'inline-flex' });

export const StakeValue = styled.div({});

export const StakeIcon = styled.div({
  marginLeft: 5,
});

export const CustomTableRowEven = {
  backgroundColor: `rgba(${HexToRGB(process.env.COLOR_PRIMARY)},.05)`,
};
