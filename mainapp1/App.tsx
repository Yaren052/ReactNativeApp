import React, {useState} from 'react';
import {
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const App = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onPressHandler = () => {
    if (name.length < 10) {
      setError('Lütfen telefon numaranızı eksiksiz giriniz.');
      return;
    }
    if (submitted) {
      setName('');
      setSubmitted(false);
      setError('');
    } else {
      setSubmitted(true);
      setError('');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setName('');
    setSubmitted(false);
    setError('');
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.body}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['blue']}
        />
      }>
      <View style={styles.content}>
        <Text style={styles.text}>
          Lütfen telefon numaranızı başında sıfır olmadan giriniz:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="+905XX-XXX-XXXX"
          onChangeText={value => setName(value)}
          keyboardType="phone-pad"
          maxLength={10}
          value={name}
        />
        <Button
          title={submitted ? 'TEMİZLE' : 'KAYDET'}
          onPress={onPressHandler}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {submitted && name && !error ? (
          <Text style={styles.text}>{name} olarak kaydedildi!</Text>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'linen',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
    margin: 10,
  },
  input: {
    marginBottom: 10,
    width: 200,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    textAlign: 'center',
    borderColor: 'black',
    fontStyle: 'italic',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
});

export default App;
