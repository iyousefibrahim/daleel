import { supabase } from "@/app/lib/supabaseClient";

export const getAllServices = async () => {
  const { data, error } = await supabase.from("services").select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const getServiceById = async (id: string) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getServicesByCategoryId = async (category_id: string) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("category_id", category_id);

  if (error) {
    throw error;
  }

  return data;
};

export const getServiceSteps = async (service_id: string) => {
  const { data, error } = await supabase
    .from("service_steps")
    .select("*")
    .eq("service_id", service_id)
    .order("step_number", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
};

export const getServiceRequirements = async (service_steps_id: string) => {
  const { data, error } = await supabase
    .from("service_requirements")
    .select("*")
    .eq("service_steps_id", service_steps_id);

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Starts a service for a given user by creating a trip,
 * inserting all service steps, and their associated requirements.
 *
 * @param service_id - ID of the service to start
 * @param user_id - ID of the user starting the service
 * @returns The created trip object
 * @throws Throws an error if any step of the process fails
 */
export const startService = async (service_id: string, user_id: string) => {
  // 1. Fetch service name
  const { data: serviceData, error: serviceError } = await supabase
    .from("services")
    .select("*")
    .eq("id", service_id)
    .single();

  if (serviceError) {
    throw serviceError;
  }

  // 2. Create a new trip
  const { data: tripData, error: tripError } = await supabase
    .from("trips")
    .insert({
      user_id,
      service_id,
      service_name: serviceData.name,
      status: "in_progress",
    })
    .select(); // Select to get inserted row

  if (tripError || !tripData?.[0]) {
    console.error("Failed to create trip:", tripError);
    throw tripError || new Error("Trip creation failed");
  }

  const trip = tripData[0];

  // 2. Fetch all steps for the service
  const { data: serviceSteps, error: serviceStepsError } = await supabase
    .from("service_steps")
    .select("*")
    .eq("service_id", service_id);

  if (serviceStepsError) {
    console.error("Failed to fetch service steps:", serviceStepsError);
    throw serviceStepsError;
  }

  if (!serviceSteps || serviceSteps.length === 0) {
    throw new Error("No steps found for this service");
  }

  // 3. For each step, insert it into trip_steps and its requirements into trip_steps_requirements
  for (const step of serviceSteps) {
    // 3a. Insert step into trip_steps
    const { data: tripStepData, error: tripStepError } = await supabase
      .from("trip_steps")
      .insert({
        trip_id: trip.id,
        step_number: step.step_number,
        title: step.title,
        description: step.description,
      })
      .select();

    if (tripStepError || !tripStepData?.[0]) {
      console.error("Failed to insert trip step:", tripStepError);
      throw tripStepError || new Error("Trip step insertion failed");
    }

    // 3b. Fetch requirements for this step
    const { data: requirements, error: requirementsError } = await supabase
      .from("service_requirements")
      .select("*")
      .eq("service_steps_id", step.id);

    if (requirementsError) {
      console.error("Failed to fetch step requirements:", requirementsError);
      throw requirementsError;
    }

    // 3c. Insert step requirements into trip_steps_requirements
    if (requirements && requirements.length > 0) {
      const { error: tripRequirementsError } = await supabase
        .from("trip_steps_requirements")
        .insert(
          requirements.map((req) => ({
            trip_step_id: tripStepData[0].id,
            title: req.title,
            notes: req.notes,
          }))
        );

      if (tripRequirementsError) {
        console.error(
          "Failed to insert trip step requirements:",
          tripRequirementsError
        );
        throw tripRequirementsError;
      }
    }
  }

  // 4. Return the created trip
  return trip;
};

export const completeService = async (service_id: string) => {
  // TODO: implement complete service
};

export const cancelService = async (service_id: string) => {
  // TODO: implement cancel service
};
