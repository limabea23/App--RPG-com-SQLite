import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

export default function CharacterCard({ character, onToggleRecruit, onRemove }) {
    return (
        <Card style={[styles.character, character.recruited && styles.characterRecruited]}>
            <Card.Title
                title={character.name}
                titleStyle={[styles.characterText, character.recruited && styles.characterRecruitedText]}
                        right={() => (
                            <IconButton
                                icon={character.recruited ? "⭐" : "💤"}
                                color={character.recruited ? "#E69A28" : "#F4E4BC"}
                                onPress={() => onToggleRecruit(character)}
                            />
                        )}
            />
            <Card.Actions>
                <IconButton
                    icon="delete"
                    color="#C5282F"
                    onPress={() => onRemove(character)}
                />
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    character: {
        backgroundColor: "#2C1810", // Marrom D&D
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#58180D", // Vermelho escuro D&D
    },
    characterRecruited: {
        backgroundColor: "#58180D", // Vermelho escuro D&D para recrutado
        borderColor: "#E69A28", // Dourado D&D
        borderWidth: 2,
    },
    characterText: {
        fontSize: 16,
        color: "#F4E4BC", // Pergaminho D&D
        fontWeight: "500",
    },
    characterRecruitedText: {
        color: "#E69A28", // Dourado D&D para recrutados
        fontWeight: "bold",
    },
});