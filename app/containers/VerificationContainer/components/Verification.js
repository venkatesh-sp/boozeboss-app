import React, { Component } from 'react'
import styled from 'styled-components'; 
import { Message, Uploader, Icon, Divider, Button } from 'rsuite';
import VerificationUploader from './VerificationUploader'

const VerificationSection = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
`
const UploadSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0 0 0;
`

export default class Verification extends Component {

    state = {
        id_front: false,
        id_back: false,
        selfie: false,
    }

    handleToggle = (field) => {
        this.setState({[field]: true})
    }

    render() {
        const {id_front, id_back, selfie} = this.state;
        return (
            <VerificationSection>
                <Message 
                    description={(
                        <React.Fragment>
                            <p>In order to verify you are +18 we need an <b>ID</b> or <b>Passport</b> and an updated <b>Selfie</b>.</p>
                            <br />
                            <p>This process could take up to 24 hours</p>
                        </React.Fragment>
                    )} 
                />
                <Divider />
                <UploadSection>
                    <p>ID/Passport (Front-View)</p>
                    <VerificationUploader 
                        {...this.props}
                        value={id_front}
                        verification_type="id_front"
                        handleToggle={this.handleToggle}
                    />
                </UploadSection>
                <Divider />
                <UploadSection>
                    <p>ID/Passport (Back-View)</p>
                    <VerificationUploader 
                        {...this.props}
                        value={id_back}
                        verification_type="id_back"
                        handleToggle={this.handleToggle}
                    />
                </UploadSection>
                <Divider />
                <UploadSection>
                    <p>Selfie</p>
                    <VerificationUploader 
                        {...this.props}
                        value={selfie}
                        verification_type="selfie"
                        handleToggle={this.handleToggle}
                    />
                </UploadSection>
                <Divider />
                <Button color="green" disabled={!id_front || !id_back || !selfie }>
                    Submit Verification
                </Button>
            </VerificationSection>
        )
    }
}
