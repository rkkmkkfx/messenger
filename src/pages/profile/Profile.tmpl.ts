import ChatLayout from '../../layouts/ChatLayout';

import Buttons from '../../components/Buttons';

import FieldsContainer from './FieldsContainer';

export default ChatLayout({
  children: `
    ${FieldsContainer}
    {#with buttons.0 as button #}
      ${Buttons.primary}
    {#with#}
    {#with buttons.1 as button #}
      ${Buttons.secondary}
    {#with#}
  `,
});
