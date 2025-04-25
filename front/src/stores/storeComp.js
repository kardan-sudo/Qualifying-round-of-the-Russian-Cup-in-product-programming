import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./useAuthStore";

export const competitionStore = defineStore("comp", () => {
  const errorAddCompetition = ref(null);
  const loading = ref(false);
  const id = ref(null);
  const teamId = ref();
  const zavkaCreate = ref(false);
  function setzavkaCreate(ne) {
    zavkaCreate.value = ne;
    console.log(zavkaCreate);
  }
  function setteamId(ne) {
    teamId.value = ne;
    console.log(teamId.value);
  }
  function setError(err) {
    errorAddCompetition.value = err;
  }
  function setId(newid) {
    id.value = newid;
    console.log(id);
  }
  const getId = computed(() => id.value);
  const getLoading = computed(() => id.value);
  const getzavkaCreate = computed(() => zavkaCreate.value);
  const getteamId = computed(() => teamId.value);
  async function addCompetitions(formstate, token) {
    try {
      loading.value = true;
      const dt = { ...formstate };
      const response = await axios.post(
        "/api/competitions/create/",
        formstate,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      loading.value = false;
      return true;
    } catch (err) {
      setError(errorAddCompetition.response.data);
      loading.value = false;
      return false;
    } finally {
      loading.value = false;
    }
  }
  return {
    setteamId,
    getteamId,
    setzavkaCreate,
    getzavkaCreate,
    errorAddCompetition,
    getLoading,
    loading,
    addCompetitions,
    setId,
    getId,
  };
});
