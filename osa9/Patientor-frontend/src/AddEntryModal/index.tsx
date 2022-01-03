import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import EntryForms, { HealthCheckEntryFormValues, OccupationalEntryFormValues, HospitalEntryFormValues } from './AddEntryForm';

interface HealthCheckProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  error?: string;
}

interface OccupationalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalEntryFormValues) => void;
  error?: string;
}


interface HospitalProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
  error?: string;
}


const AddHealthCheckEntryModal = ({ modalOpen, onClose, onSubmit, error }: HealthCheckProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new healthcheck entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <EntryForms.AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

const AddOccupationalEntryModal = ({ modalOpen, onClose, onSubmit, error }: OccupationalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new healthcheck entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <EntryForms.AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error }: HospitalProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new healthcheck entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <EntryForms.AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);


export default { AddHealthCheckEntryModal, AddOccupationalEntryModal, AddHospitalEntryModal };
