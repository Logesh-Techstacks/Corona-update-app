import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import downArrowImg from '../assets/images/arrow-down.png';

export default function App() {
  const [activeSections, setActiveSections] = useState([]);
  const [value, setValue] = useState([]);
  const [isloading, setloading] = useState(true);
  let totalList;

  const fetchData = () => {
    fetch('https://api.covid19india.org/v2/state_district_wise.json', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const state = responseJson;
        setValue(state);
        setloading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setSections = (sections) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    {
      section.districtData.map((data) => {
        const val = section.districtData.reduce(function (
          previousValue,
          currentValue,
        ) {
          return {
            confirmed: previousValue.confirmed + currentValue.confirmed,
          };
        });
        totalList = val.confirmed;
      });
    }
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <View style={styles.headerView}>
          <View style={{width: '40%'}}>
            <Text style={styles.headerText}>{section.state}</Text>
          </View>
          <View style={{width: '30%'}}>
            <Text style={styles.confirmedHeader}>Confirmed: {totalList}</Text>
          </View>
          <View style={{width: '10%'}}>
            <Image source={downArrowImg} style={{width: 20, height: 20}} />
          </View>
        </View>
        <View style={styles.seperator} />
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <View style={styles.contentView}>
          <Text style={styles.contentHead}>District</Text>
          <Text style={styles.contentHead}>Confirmed</Text>
        </View>
        {section.districtData.map((data) => {
          return (
            <View style={styles.contentBody}>
              <Text style={styles.contentText}>{data.district}</Text>
              <Text style={styles.contentText}>{data.confirmed}</Text>
            </View>
          );
        })}
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.commonHead}>COVID-19</Text>
      {isloading ? (
        <View style={styles.loadingView}>
          <Text style={styles.loadingText}>Stay home</Text>
          <Text style={styles.loadingTextTwo}> Stay safe </Text>
          <ActivityIndicator size="large" color="#ff0059" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{paddingTop: 10}}>
          <Accordion
            activeSections={activeSections}
            sections={value}
            touchableComponent={TouchableOpacity}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 20,
  },
  commonHead: {
    textAlign: 'center',
    fontSize: 22,
    color: '#00ccff',
    fontWeight: 'bold',
  },
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#eb4034',
    padding: 10,
  },
  headerText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#ff0059',
  },
  confirmedHeader: {
    fontSize: 15,
    marginTop: 5,
    color: '#009bde',
  },
  contentBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  seperator: {
    borderWidth: 0.5,
    borderBottomColor: '#00ccff',
    marginTop: 15,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  contentView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -20,
    marginBottom: 10,
  },
  contentHead: {
    color: '#647375',
    fontSize: 19,
    fontWeight: 'bold',
  },
  contentText: {
    color: '#3d3d3d',
    fontSize: 18,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#009bde',
    fontSize: 40,
    fontStyle: 'italic',
  },
  loadingTextTwo: {
    color: '#ff0059',
    fontSize: 40,
    fontStyle: 'italic',
    marginBottom:10
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
 
});
