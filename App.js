import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    //리액트 네이티브는 IOS와 안드로이드와 같은 운영체제를 구성하기 위한 개발자들을 위한 인터페이스
    //브라우저와는 다르게 CSS에서 실수를 하면 개발자에게 오류를 표시하면서 알려줌

    //1. 리액트 네이티브는 웹사이트(브라우저)가 아님. HTML이 아니기 때문에 div와 같은 태그 사용X.
    //내가 만드는 모든 것은 <div>대신에 Container인 <View>를 사용 ! (import 필요)
    //2. 리액트 네이티브에 있는 모든 text는 <span>, <p>, <h1>대신에 <Text> 컴포넌트에 들어가야함
    //3. 웹에서의 모든 CSS style을 사용할 수 없음(98% 정도?)

    //Component는 화면에 렌더링되는 항목
    //API는 운영체제와 소통하는 자바스크립트 코드
    //Component와 API를 통해 폰과 앱이 작동하는 방식을 변경할 수 있음
    //Expo SDK란 Expo 팀에서 자체적으로 만든 패키지와 APIs

    //style을 사용하기 위해서는 StyleSheet.create를 사용하거나 객체를 만들어서 넣어줘야함
    <View
      //styles 객체를 만들지않고 바로 객체를 넣어주는 방법도 있음
      // style={{
      //   flex: 1,
      //   backgroundColor: "#fff",
      //   alignItems: "center",
      //   justifyContent: "center",
      // }}

      style={styles.container} //View는 기본적으로 Flex Container, 방향 기본값은 Column(웹이랑 반대)
      //React Native에서는 너비와 넓이에 기반해서 레이아웃을 만들지 X(스크린 사이즈에 따라 다르기 때문)
      //width와 height가 아닌 Flex의 비율만 사용해서 레이아웃을 조정
    >
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <View>
        <View style={styles.weather}>
          <View style={styles.day}>
            <Text style={styles.temp}>27</Text>
            <Text style={styles.description}>Sunny</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

//StyleSheet.create를 사용하여 객체를 만들면 자동완성 기능을 사용할 수 있음
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  text: {
    fontSize: 100,
    color: "black",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {
    flex: 3,
  },
  day: {
    flex: 1,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});
