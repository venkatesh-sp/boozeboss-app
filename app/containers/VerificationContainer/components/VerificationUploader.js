import React, { Component } from 'react'
import { Uploader, IconButton, Icon } from 'rsuite';
import styled from 'styled-components';

const AttachmentRow = styled.div`
    display: flex;
    ${props => props.hasMargin && 'margin: -0.5em 0 0 0;'}
    flex-direction: row;
    justify-items: space-between;
    align-items: center;
`

const UploaderValidator = styled(Uploader)`
    .rs-uploader-trigger {
        visibility: ${props => props.has_scope ? 'visible' : 'hidden'};
    }
`


export default class VerificationUploader extends Component {

    handleUploadChange = async (files) => {
        const {verification_type, uploadVerification, handleToggle, value} = this.props;

        const currentFile = files[0];

        uploadVerification(verification_type, currentFile.blobFile);
        handleToggle(verification_type);

    }


    /* handleRemove = (brief_id, brief_attachment_id) => {
        const {deleteBriefAttachment} = this.props;
        deleteBriefAttachment(brief_id, brief_attachment_id);
    }

    getList = (attachments) => {
        return attachments.map(att => {
            return {
                name: att.file_name, 
                url: att.url,
                file_type: att.file_type,
                created_at: att.created_at,
            }
        })
    } */

    
    render() {
        const {value} = this.props;
        return (
            <Uploader 
                listType="picture"
                multiple={false}
                autoUpload={false}
                onChange={this.handleUploadChange}
                removable={true}
            >
                {!value && (
                     <button>
                        <Icon icon='camera-retro' size="lg" />
                    </button>
                )}
            </Uploader>
        )
    }
}
