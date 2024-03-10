import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function SimplePopup() {
  const [anchor, setAnchor] = React.useState(null);
  const {user} = useSelector(state=>state.auth)
  const dispatch  = useDispatch()
  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };
  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  return (
    <div>
      <p className="w-[60px] h-[60px] rounded-full bg-green-500 text-center py-3 text-2xl text-white font-bold cursor-pointer uppercase" aria-describedby={id} type="button" onClick={handleClick}>{user.key[0]}</p>
      <BasePopup id={id} open={open} anchor={anchor}>
        <PopupBody>
            <div onClick={()=>navigate('/my-books')} className=' cursor-pointer flex items-center gap-3 text-xl px-4 py-1 hover:bg-gray-300'><img src="./images/library.png" alt="logout" className='w-6' />Mening Kitoblarim</div>
            <hr />
            <div onClick={()=>{dispatch(signOut()); navigate('/')}} className=' cursor-pointer flex items-center gap-3 text-xl px-4 py-1 hover:bg-gray-300'><img src="./images/logout.png" alt="logout" className='w-6' />Chiqish</div>
        </PopupBody>
        
      </BasePopup>
    </div>
  );
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const PopupBody = styled('div')(
  ({ theme }) => `
  width: max-content;
  padding: 4px 0;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  z-index: 1;
`,
);

const Button = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 127, 255, 0.5)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
`,
);