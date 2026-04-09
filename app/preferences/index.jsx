import { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from 'convex/react';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Dumbbell01Icon, FemaleSymbolFreeIcons, MaleSymbolFreeIcons, PlusSignSquareIcon, WeightScaleIcon } from '@hugeicons/core-free-icons';
import { api } from '../../convex/_generated/api';

import { UserContext } from './../../context/UserContext';
import Input from './../../components/shared/Input';
import Button from './../../components/shared/Button';
import Colors from './../../shared/Colors';
import { CalculateCaloriesAI } from '../../services/AiModel';
import Prompt from '../../shared/Prompt';

export default function Preferences() {
  const router = useRouter();

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');
  const [gender, setGender] = useState('');

  const { user, setUser } = useContext(UserContext);

  const updateUserPreferences = useMutation(api.Users.UpdateUserPreferences);

  const onContinue = async () => {
    if (!weight || !height || !goal || !gender) {
      Alert.alert('Missing Information', 'Please fill in all the fields to continue');
      return;
    }

    if (!user?._id) {
      Alert.alert('Error', 'User not loaded');
      return;
    }

    const data = {
      uid: user._id,
      weight: weight,
      height: height,
      goal: goal,
      gender: gender
    }

    // Calculate calories and proteins using AI
    const PROMPT = JSON.stringify(data) + Prompt.CALORIES_PROMPT;
    console.log(PROMPT);
    const AIResult = await CalculateCaloriesAI(PROMPT);
    const AIResponse = AIResult.choices[0].message.content;
    const JSONContent = JSON.parse(AIResponse.replace('```json', '').replace('```', ''));
    console.log(JSONContent);

    const result = await updateUserPreferences({
      ...data,
      ...JSONContent
    });

    setUser(prev => ({
      ...prev,
      ...data,
      ...JSONContent
    }));

    router.replace('/(tabs)/Home');
  }

  return (
    <View style={{
      padding: 20,
      marginTop: 20,
      height: '100%',
      backgroundColor: Colors.WHITE
    }}>
      <Text style={{
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30
      }}>
        Tell us about yourself
      </Text>

      <Text style={{
        textAlign: 'center',
        fontSize: 16,
        color: Colors.GRAY
      }}>
        This helps us personalize your experience and provide you with better meal plans and recommendations.
      </Text>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10
      }}>
        <View style={{ flex: 1 }}>
          <Input placeholder='e.g. 60' label='Weight (kg)' onChangeText={setWeight} />
        </View>
        <View style={{ flex: 1 }}>
          <Input placeholder='e.g. 170' label='Height (cm)' onChangeText={setHeight} />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 'medium', fontSize: 18, marginBottom: 15 }}>
          Gender
        </Text>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10
        }}>
          <TouchableOpacity
            onPress={() => setGender('Male')}
            style={{
              borderWidth: 1,
              padding: 15,
              borderColor: gender == 'Male' ? Colors.PRIMARY : Colors.GRAY,
              borderRadius: 10,
              flex: 1,
              alignItems: 'center'
            }}>
            <HugeiconsIcon icon={MaleSymbolFreeIcons} size={40} color={Colors.BLUE} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGender('Female')}
            style={{
              borderWidth: 1,
              padding: 15,
              borderColor: gender == 'Female' ? Colors.PRIMARY : Colors.GRAY,
              borderRadius: 10,
              flex: 1,
              alignItems: 'center'
            }}>
            <HugeiconsIcon icon={FemaleSymbolFreeIcons} size={40} color={Colors.PINK} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={{ fontWeight: 'medium', fontSize: 18 }}>What's Your Goal?</Text>

        <TouchableOpacity
          onPress={() => setGoal('Weight Loss')}
          style={[styles.goalContainer, { borderColor: goal == 'Weight Loss' ? Colors.PRIMARY : Colors.GRAY }]}
        >
          <HugeiconsIcon icon={WeightScaleIcon} />
          <View>
            <Text style={styles.goalText}>Lose Weight</Text>
            <Text style={styles.goalSubText}>Reduce Body Fat and Get Lean</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGoal('Muscle Gain')}
          style={[styles.goalContainer, { borderColor: goal == 'Muscle Gain' ? Colors.PRIMARY : Colors.GRAY }]}
        >
          <HugeiconsIcon icon={Dumbbell01Icon} />
          <View>
            <Text style={styles.goalText}>Gain Muscle</Text>
            <Text style={styles.goalSubText}>Build Muscle and Get Stronger</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGoal('Weight Gain')}
          style={[styles.goalContainer, { borderColor: goal == 'Weight Gain' ? Colors.PRIMARY : Colors.GRAY }]}
        >
          <HugeiconsIcon icon={PlusSignSquareIcon} />
          <View>
            <Text style={styles.goalText}>Gain Weight</Text>
            <Text style={styles.goalSubText}>Increase Healthy Body Mass</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 25 }}>
        <Button
          title={'Continue'}
          onPress={onContinue}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  goalContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 15,
    marginTop: 10
  },
  goalText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  goalSubText: {
    color: Colors.GRAY
  }
});