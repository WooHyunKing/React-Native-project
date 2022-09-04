import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

//Dimensions API로 각 사용자의 스크린의 크기를 알 수 있음 !
//아래는 ES6 문법, 객체안에 있는 width를 가져오고 그 이름을 SCREEN_WIDTH로 바꾼다는 의미
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const API_KEY = "a73804592d8a4cfd13d68c5faee6eef4";

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    //Reverse geocode
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );

    setCity(location[0].city);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`
    );
    const json = await response.json();
    setDays(json.daily);
  };

  useEffect(() => {
    getWeather();
  }, []);

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
        <Text style={styles.cityName}>{city}</Text>
      </View>
      {/* ScrollView 컴포넌트를 사용하면 스크롤을 통해 넘길 수 있음
      Horizontal을 사용하면 수직이 아니라 수평으로 요소들을 렌더링, 이때는 style이 아니라 contentContainerStyle로 스타일을 받아야함 */}
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{
                marginTop: 50,
              }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}> {day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
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
  weather: {},
  day: {
    width: SCREEN_WIDTH,
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
  tinyText: {
    fontSize: 20,
  },
});
