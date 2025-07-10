export enum YesNoStatus {
    No = 0,
    Yes = 1,
}

export function yesNoStatusOptions() {
    return [
        { id: YesNoStatus.No, name: "Não" },
        { id: YesNoStatus.Yes, name: "Sim" },
    ];
}