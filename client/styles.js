import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
`;

export const InputAuth = styled.TextInput`
  width: 100%;
  padding: 10px;
  margin-vertical: 5px;
  border: 1px solid #000000;
  background-color: #ffffff;
  color: #000000;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  margin-vertical: 10px;
  background-color: #000000;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;

export const Link = styled.Text`
  color: #0000ff;
  text-decoration: underline;
  margin-top: 10px;
`;

export const TaskContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 16px;
`;

export const TaskInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const TaskButton = styled.TouchableOpacity`
  background-color: #000000;
  padding: 10px;
  width: 80px;
  align-items: center;
  justify-content: center;
  height: 55px;
`;
export const InputTask = styled.TextInput`
  flex: 1;
  padding: 10px;
  border: 1px solid #000000;
  background-color: #ffffff;
  color: #000000;
  height: 54px;
  margin-left: 10px;
`;
export const CheckIcon = styled.Text`
  font-size: 30px;
  color: #000000;
  margin-left: 10px;
`;

export const ActionIcon = styled.Text`
  font-size: 24px;
  color: #000000;
  margin-left: 10px;
`;
export const ViewCatsButton = styled.TouchableOpacity`
  background-color: #000000;
  padding: 10px;
  width: 70px;
  align-items: center;
  justify-content: center;
  height: 55px;
`;

export const ViewCatsButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;

export const RandomButton = styled.TouchableOpacity`
  background-color: #000000;
  padding: 15px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const RandomButtonText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;
export const CatContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: "center",
  },
})`
  flex: 1;
  padding: 20px;
`;
export const CatImage = styled.Image`
  width: 300px;
  height: 300px;
  resize-mode: cover;
  margin-bottom: 20px;
`;

export const CatDetail = styled.View`
  align-items: flex-start;
`;

export const CatBreedName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
`;

export const CatDescription = styled.Text`
  font-size: 16px;
  text-align: left;
  margin-bottom: 10px;
`;

export const CatDetailText = styled.Text`
  font-size: 16px;
  text-align: left;
  margin-bottom: 5px;
`;

export const CatDetailLabel = styled.Text`
  font-weight: bold;
`;

export const NoInfoText = styled.Text`
  font-size: 16px;
  color: gray;
  text-align: left;
`;

export const LinkText = styled.Text`
  color: blue;
  text-decoration-line: underline;
`;
