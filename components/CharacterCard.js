import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CharacterCard({ character, onToggleRecruit, onRemove }) {
    return (<TouchableOpacity
        style={[styles.character, item.recruited && styles.characterRecruited]}
        onPress={() => toggleRecruit(item)}
        onLongPress={() => removeCharacter(item)}
    >
        <Text style={[styles.characterText, item.recruited && styles.characterRecruitedText]}>
            {item.name}
        </Text>
        <Text style={styles.status}>
            {item.recruited ? "⭐" : "💤"}
        </Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    character: {
        backgroundColor: "#2C1810", // Marrom D&D
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#58180D", // Vermelho escuro D&D
    },
    characterRecruited: {
        backgroundColor: "#58180D", // Vermelho escuro D&D para recrutado
        borderColor: "#E69A28", // Dourado D&D
        borderWidth: 2,
    },
    characterText: {
        flex: 1,
        fontSize: 16,
        color: "#F4E4BC", // Pergaminho D&D
        fontWeight: "500",
    },
    characterRecruitedText: {
        color: "#E69A28", // Dourado D&D para recrutados
        fontWeight: "bold",
    },
    status: {
        fontSize: 20,
        marginLeft: 10,
    },
});