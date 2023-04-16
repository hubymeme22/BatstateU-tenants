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

import { fetchAsAdmin, getUserLogs } from '../../../../../services/request';
import Logs from './Logs';

function ModalStatement(props) {
  const { isOpen, toggleModal, selectedTenant } = props;
  const { handlePayment } = props;

  const [userInfo, setUserInfo] = useState(userInitialState);
  const [userBillings, setUserBillings] = useState(billingInitialState);
  const [userLogs, setUserLogs] = useState([]);

  const [tenantRoom, setTenantRoom] = useState('');

  const [isViewingLogs, setIsViewingLogs] = useState(false);

  // Retrieve the userBills and logs
  useEffect(() => {
    if (!selectedTenant) return;

    const { username, roomID } = selectedTenant;
    const { first, middle, last } = selectedTenant.name;

    setTenantRoom(roomID);

    const formattedTenantInfo = {
      ...userInfo,
      srCode: username,
      username: username,
      details: {
        name: {
          first,
          middle,
          last,
        },
      },
    };

    setUserInfo(formattedTenantInfo);

    fetchTenantBillings(username);
    fetchTenantLogs(username);
  }, [selectedTenant]);

  const fetchTenantBillings = async (username) => {
    const { data } = await fetchAsAdmin(`billing/report/${username}`);
    setUserBillings(data.report);
  };

  const fetchTenantLogs = async (username) => {
    const response = await getUserLogs(username);
    setUserLogs(response.logs);
  };

  const updateBillings = async (srcode) => {
    handlePayment(srcode);
    setUserBillings({ ...userBillings, isPaid: true });
  };

  const toggle = () => {
    setIsViewingLogs(!isViewingLogs);
    fetchTenantLogs(userInfo.username);
  };

  return (
    <StyledModalStatement
      isOpen={isOpen}
      onRequestClose={() => {
        toggleModal();
        setIsViewingLogs(false);
      }}
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
        <Button
          onClick={() => {
            console.log(userInfo);
            toggle();
          }}
        >
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
