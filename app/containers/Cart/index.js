import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, InputGroup, InputNumber, Row, Col } from 'rsuite';

const CartItems = styled.div`
  overflow: scroll;
  height: 94%;
`;

const StyledMenuDiv = styled.div`
  width: 100%;
  background: #1a1b1c;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
`;

const StyledCartItemDiv = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 6px 12px;
  border-radius: 8px;
  margin-top: 16px;
`;
const StyledText = styled.p`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  color: ${props => props.color};
  text-align: center;
  margin: 0px;
`;
const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;
const ButtonStyles = {
  width: '100%',
  position: 'absolute',
  bottom: '0px',
  left: '0',
  backgroundColor: '#3498ff',
  borderRadius: '8px',
  padding: '5px 10px',
  text: 'center',
};

export default class Cart extends Component {
  state = {
    cartItems: '',
    outlet: '',
    currentoutlet: '',
  };

  componentDidMount() {
    const { state } = this.props.location;
    if (state) {
      const { currentoutlet, outlet, cartItems } = state;
      this.setState({ currentoutlet, outlet, cartItems });
    }
  }

  render() {
    const { outlet, cartItems } = this.state;

    if (!outlet && !cartItems) {
      return <>Loading...</>;
    }

    const itemToRender = outlet.menu.map((item, index) => {
      const inputRef = React.createRef();

      const handleMinus = () => {
        inputRef.current.handleMinus();
      };
      const handlePlus = () => {
        inputRef.current.handlePlus();
      };
      if (item.id in cartItems) {
        return (
          <StyledMenuDiv key={index}>
            <StyledFlexContainer>
              <StyledText size="16px" color="#454651" weight="bold">
                {item.name}
              </StyledText>
            </StyledFlexContainer>
            <StyledFlexContainer>
              <StyledText size="13px" color="#ffffff" weight="normal">
                {item.description}
              </StyledText>
            </StyledFlexContainer>
            <div style={{ marginTop: '16px' }}>
              <Row>
                <Col xs={12} xsPush={12}>
                  <InputGroup style={{ width: '100%' }}>
                    <InputGroup.Button onClick={handleMinus}>
                      -
                    </InputGroup.Button>
                    <InputNumber
                      className="custom-input-number"
                      ref={inputRef}
                      max={99}
                      min={1}
                      value={this.state.cartItems[item.id]}
                      onChange={value => {
                        this.setState({
                          cartItems: {
                            ...this.state.cartItems,
                            [item.id]: value,
                          },
                        });
                      }}
                    />
                    <InputGroup.Button onClick={handlePlus}>
                      +
                    </InputGroup.Button>
                  </InputGroup>
                </Col>
                <Col
                  xs={12}
                  xsPull={12}
                  style={{
                    marginTop: '8px',
                    color: 'white',
                    textAlign: 'left',
                  }}
                >
                  {item.price}
                </Col>
              </Row>
            </div>
          </StyledMenuDiv>
        );
      }
    });

    return (
      <div
        style={{
          overflowY: 'scroll',
          backgroundColor: '#030303',
          height: '100%',
        }}
      >
        <div style={{ textAlign: 'center', height: '100%' }}>
          <CartItems>{itemToRender}</CartItems>
          <Button
            style={{
              position: 'fixed',
              bottom: '0px',
              width: '95%',
              left: '0px',
              backgroundColor: '#3498ff',
              color: '#fff',
              zIndex: '9',
              border: '0px',
              marginLeft: '10px',
              marginBottom: '10px',
            }}
            onClick={() => {
              const { currentoutlet, cartItems, outlet } = this.state;
              this.props.history.push('/auth', {
                outlet,
                currentoutlet,
                cartItems,
              });
            }}
          >
            {_.size(this.state.cartItems)} items Place Order
          </Button>
        </div>
      </div>
    );
  }
}
