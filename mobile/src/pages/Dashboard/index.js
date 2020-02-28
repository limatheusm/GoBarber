import React, { useEffect, useState } from 'react';

import Api from '~/services/api';
import Background from '~/components/Background';
import { Container, Title, List } from './styles';
import Appointment from '~/components/Appointment';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      const response = await Api.get('appointments');
      setAppointments(response.data);
    }

    loadAppointments();
  }, []);

  async function handleCancel(id) {
    await Api.delete(`appointments/${id}`);

    setAppointments(appointments.filter(appointment => appointment.id !== id));
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>

        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}
