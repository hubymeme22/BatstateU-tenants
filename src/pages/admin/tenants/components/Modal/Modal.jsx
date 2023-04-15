import React, { useState, useEffect } from 'react';

import { Button, StyledModalStatement } from './styled';
import { ButtonContainer } from '../../../../../styles/shared/button';
import { ModalStyling } from '../../../../../styles/shared/modal';

import FormContent from '../../../../../components/Form/FormAdmin';
import Loader from '../../../../../components/Loader';

import {
  userInitialState,
  billingInitialState,
} from '../../../../../services/format/FormState';

import useToggle from '../../../../../hooks/useToggle';
import { fetchAsAdmin, getUserLogs } from '../../../../../services/request';
import Logs from './Logs';

function ModalStatement(props) {
  const { isOpen, toggleModal, selectedTenant } = props;
  const { handlePayment } = props;

  const [userInfo, setUserInfo] = useState(userInitialState);
  const [userBillings, setUserBillings] = useState(billingInitialState);
  const [userLogs, setUserLogs] = useState([]);

  const [tenantRoom, setTenantRoom] = useState('');

  const [isViewingLogs, toggleIsViewingLogs] = useToggle(false);

  // Retrieve the userBills and logs
  useEffect(() => {
    if (!selectedTenant) return;

    const { username, roomID } = selectedTenant;
    const { first, middle, last } = selectedTenant.name;

    setTenantRoom(roomID);

    const formattedTenantInfo = {
      ...userInfo,
      srCode: username,
      details: {
        name: {
          first,
          middle,
          last,
        },
      },
    };

    setUserInfo(formattedTenantInfo);

    const getUserData = async () => {
      const billings = await fetchTenantBillings(username);
      setUserBillings(billings.data.report);

      const data = await fetchTenantLogs(username);
      setUserLogs(data.logs);
    };

    getUserData();
  }, [selectedTenant]);

  const fetchTenantBillings = async (username) => {
    return await fetchAsAdmin(`billing/report/${username}`);
  };

  const fetchTenantLogs = async (username) => {
    return await getUserLogs(username);
  };

  const updateBillings = async (srcode) => {
    handlePayment(srcode);
    setUserBillings({ ...userBillings, isPaid: true });
  };

  return (
    <StyledModalStatement
      isOpen={isOpen}
      onRequestClose={toggleModal}
      style={ModalStyling}
    >
      {/* View the form with the user billing content */}

      {userInfo != userInitialState || userBillings != billingInitialState ? (
        <div>
          {!isViewingLogs ? (
            <FormContent
              userInfo={userInfo}
              userBillings={userBillings}
              roomID={tenantRoom}
            />
          ) : (
            <Logs list={userLogs} />
          )}
        </div>
      ) : (
        <Loader />
      )}

      <ButtonContainer>
        <Button onClick={toggleIsViewingLogs}>
          View {!isViewingLogs ? 'Logs' : 'Current Billing'}
        </Button>

        {!isViewingLogs && (
          <Button
            disabled={userBillings.isPaid}
            onClick={() => updateBillings(userInfo.srCode)}
          >
            Mark as Paid
          </Button>
        )}
      </ButtonContainer>
    </StyledModalStatement>
  );
}

export default ModalStatement;
